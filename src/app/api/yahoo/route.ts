import { NextRequest, NextResponse } from 'next/server';

const SYMBOL_MAP: Record<string, string> = {
  'hs300': 'ASHR',
  'sp500': 'SPY',
  'nasdaq100': 'QQQ',
  'gold': 'GLD',
  'btc': 'BTC-USD',
};

const CNY_ASSETS = new Set(['hs300', 'sp500', 'nasdaq100', 'gold']);

async function fetchMonthlyPrices(symbol: string, period1: number, period2: number) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${period1}&period2=${period2}&interval=1mo`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 3600 } });
  if (!res.ok) return null;
  const json = await res.json();
  const r = json.chart?.result?.[0];
  if (!r) return null;
  const ts: number[] = r.timestamp || [];
  const q = r.indicators?.adjclose?.[0]?.adjclose || r.indicators?.quote?.[0]?.close || [];
  return ts.length && q.length ? { timestamps: ts, quotes: q } : null;
}

async function fetchCurrentPrice(symbol: string): Promise<number | null> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const weekAgo = now - 7 * 86400;
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?period1=${weekAgo}&period2=${now}&interval=1d`;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 300 } });
    if (!res.ok) return null;
    const json = await res.json();
    const r = json.chart?.result?.[0];
    if (!r) return null;
    const q = r.indicators?.adjclose?.[0]?.adjclose || r.indicators?.quote?.[0]?.close || [];
    return q.length ? q[q.length - 1] : null;
  } catch { return null; }
}

async function getUsdCnyRate(): Promise<number> {
  try {
    const now = Math.floor(Date.now() / 1000);
    const res = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/USDCNY=X?period1=${now - 86400}&period2=${now}&interval=1d`, { headers: { 'User-Agent': 'Mozilla/5.0' }, next: { revalidate: 3600 } });
    if (!res.ok) return 7.2;
    const json = await res.json();
    const q = json.chart?.result?.[0]?.indicators?.quote?.[0]?.close;
    return q?.[q.length - 1] || 7.2;
  } catch { return 7.2; }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const asset = searchParams.get('asset') || 'hs300';
  const period1Str = searchParams.get('period1');
  const period2Str = searchParams.get('period2');

  const yahooSymbol = SYMBOL_MAP[asset];
  if (!yahooSymbol) return NextResponse.json({ error: '未知标的' }, { status: 400 });

  try {
    let period1: number, period2: number;
    if (period1Str && period2Str) {
      period1 = parseInt(period1Str, 10);
      period2 = parseInt(period2Str, 10);
    } else {
      const now = new Date();
      const start = new Date(now);
      start.setMonth(start.getMonth() - 62);
      period1 = Math.floor(start.getTime() / 1000);
      period2 = Math.floor(now.getTime() / 1000);
    }

    const isCNY = CNY_ASSETS.has(asset);

    const [priceData, usdCnyRate, rawCurrentPrice] = await Promise.all([
      fetchMonthlyPrices(yahooSymbol, period1, period2),
      isCNY ? getUsdCnyRate() : 1,
      fetchCurrentPrice(yahooSymbol),
    ]);

    if (!priceData) return NextResponse.json({ error: '数据获取失败' }, { status: 500 });

    const { timestamps, quotes } = priceData;
    const rate = isCNY ? usdCnyRate : 1;
    const currentPrice = rawCurrentPrice ? Math.round(rawCurrentPrice * rate * 100) / 100 : null;

    const allPrices: { date: string; price: number; ts: number }[] = [];
    for (let i = 0; i < timestamps.length; i++) {
      allPrices.push({
        date: new Date(timestamps[i] * 1000).toISOString().slice(0, 7),
        price: Math.round(quotes[i] * rate * 100) / 100,
        ts: timestamps[i],
      });
    }

    const data = allPrices.filter((p) => {
      if (period1Str && period2Str) return p.ts >= period1 && p.ts <= period2;
      return true;
    });

    if (!data.length) return NextResponse.json({ error: '所选时间范围内无数据' }, { status: 404 });

    const basePrice = data[0].price;
    const normalized = data.map(({ date, price }) => ({
      date,
      price,
      normalized: Math.round((price / basePrice) * 10000) / 100,
    }));

    return NextResponse.json({
      symbol: yahooSymbol,
      currency: isCNY ? 'CNY' : 'USD',
      basePrice,
      currentPrice,
      count: normalized.length,
      data: normalized,
    });
  } catch (err) {
    console.error('Yahoo error:', err);
    return NextResponse.json({ error: '请求失败' }, { status: 500 });
  }
}
