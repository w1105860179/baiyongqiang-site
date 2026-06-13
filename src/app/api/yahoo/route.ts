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
  const months = parseInt(searchParams.get('months') || '60', 10);

  const yahooSymbol = SYMBOL_MAP[asset];
  if (!yahooSymbol) {
    return NextResponse.json({ error: '未知标的' }, { status: 400 });
  }

  try {
    // 计算起始时间戳（往前推 months 个月 + 一些缓冲）
    const now = new Date();
    const startDate = new Date(now);
    startDate.setMonth(startDate.getMonth() - months - 2);

    const period1 = Math.floor(startDate.getTime() / 1000);
    const period2 = Math.floor(now.getTime() / 1000);

    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(yahooSymbol)}?period1=${period1}&period2=${period2}&interval=1mo`;

    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      next: { revalidate: 3600 }, // 缓存1小时
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

    // 提取每月收盘价
    const monthlyPrices: { date: string; price: number }[] = [];
    const count = Math.min(timestamps.length, quotes.length, months);

    for (let i = Math.max(0, timestamps.length - count); i < timestamps.length; i++) {
      monthlyPrices.push({
        date: new Date(timestamps[i] * 1000).toISOString().slice(0, 7),
        price: Math.round(quotes[i] * 100) / 100,
      });
    }

    // 归一化到初始价格 100
    const basePrice = monthlyPrices[0]?.price || 1;
    const normalized = monthlyPrices.map((p) => ({
      ...p,
      normalized: Math.round((p.price / basePrice) * 10000) / 100,
    }));

    return NextResponse.json({
      symbol: yahooSymbol,
      basePrice,
      data: normalized,
    });
  } catch (err) {
    console.error('Yahoo Finance proxy error:', err);
    return NextResponse.json({ error: '请求失败' }, { status: 500 });
  }
}
