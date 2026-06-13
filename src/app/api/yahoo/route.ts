import { NextRequest, NextResponse } from 'next/server';

const SYMBOL_MAP: Record<string, string> = {
  'hs300': 'ASHR',
  'sp500': 'SPY',
  'nasdaq100': 'QQQ',
  'gold': 'GLD',
  'btc': 'BTC-USD',
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const asset = searchParams.get('asset') || 'hs300';
  const period1Str = searchParams.get('period1');
  const period2Str = searchParams.get('period2');

  const yahooSymbol = SYMBOL_MAP[asset];
  if (!yahooSymbol) {
    return NextResponse.json({ error: '未知标的' }, { status: 400 });
  }

  try {
    let period1: number;
    let period2: number;

    if (period1Str && period2Str) {
      period1 = parseInt(period1Str, 10);
      period2 = parseInt(period2Str, 10);
    } else {
      // 默认：最近60个月
      const now = new Date();
      const startDate = new Date(now);
      startDate.setMonth(startDate.getMonth() - 62);
      period1 = Math.floor(startDate.getTime() / 1000);
      period2 = Math.floor(now.getTime() / 1000);
    }

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?period1=${period1}&period2=${period2}&interval=1mo`;

    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: `数据获取失败: ${res.status}` }, { status: res.status });
    }

    const json = await res.json();
    const result = json.chart?.result?.[0];
    if (!result) {
      return NextResponse.json({ error: '无数据' }, { status: 404 });
    }

    const timestamps: number[] = result.timestamp || [];
    const quotes = result.indicators?.adjclose?.[0]?.adjclose || result.indicators?.quote?.[0]?.close || [];

    if (!timestamps.length || !quotes.length) {
      return NextResponse.json({ error: '数据为空' }, { status: 404 });
    }

    // 提取所有可用的月度收盘价
    const allPrices: { date: string; price: number; ts: number }[] = [];
    for (let i = 0; i < timestamps.length; i++) {
      allPrices.push({
        date: new Date(timestamps[i] * 1000).toISOString().slice(0, 7),
        price: Math.round(quotes[i] * 100) / 100,
        ts: timestamps[i],
      });
    }

    // 过滤到用户指定的时间范围
    const data = allPrices.filter((p) => {
      if (period1Str && period2Str) {
        return p.ts >= period1 && p.ts <= period2;
      }
      return true;
    });

    if (!data.length) {
      return NextResponse.json({ error: '所选时间范围内无数据' }, { status: 404 });
    }

    // 归一化到第一月价格 100
    const basePrice = data[0].price;
    const normalized = data.map(({ date, price }) => ({
      date,
      price,
      normalized: Math.round((price / basePrice) * 10000) / 100,
    }));

    return NextResponse.json({
      symbol: yahooSymbol,
      basePrice,
      count: normalized.length,
      data: normalized,
    });
  } catch (err) {
    console.error('Yahoo Finance proxy error:', err);
    return NextResponse.json({ error: '请求失败' }, { status: 500 });
  }
}
