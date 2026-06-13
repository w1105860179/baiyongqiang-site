'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Calculator, TrendingUp } from 'lucide-react';

const assetList = [
  { key: 'hs300', name: '沪深300' },
  { key: 'sp500', name: '标普500' },
  { key: 'nasdaq100', name: '纳斯达克100' },
  { key: 'gold', name: '黄金' },
  { key: 'btc', name: 'BTC' },
];

function todayStr() { return new Date().toISOString().slice(0, 10); }
function yearsAgoStr(y: number) {
  const d = new Date(); d.setFullYear(d.getFullYear() - y); return d.toISOString().slice(0, 10);
}

/* ========== 定投回测 ========== */
function DcaTab() {
  const [asset, setAsset] = useState('hs300');
  const [monthlyStr, setMonthlyStr] = useState('5000');
  const [startDate, setStartDate] = useState(yearsAgoStr(3));
  const [endDate, setEndDate] = useState(todayStr());
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [currency, setCurrency] = useState('¥');
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  const monthly = Number(monthlyStr) || 0;

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const start = new Date(startDate); const end = new Date(endDate);
      end.setDate(end.getDate() + 1);
      const period1 = Math.floor(start.getTime() / 1000);
      const period2 = Math.floor(end.getTime() / 1000);
      const res = await fetch(`/api/yahoo?asset=${asset}&period1=${period1}&period2=${period2}`);
      const json = await res.json();
      if (json.error) { setError(json.error); setPrices([]); }
      else { setPrices(json.data || []); setCurrency(json.currency === 'USD' ? '$' : '¥'); setCurrentPrice(json.currentPrice ?? null); }
    } catch { setError('网络请求失败'); setPrices([]); }
    finally { setLoading(false); }
  }, [asset, startDate, endDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const result = useMemo(() => {
    if (!prices.length || monthly <= 0) return { totalInvested: 0, finalValue: 0, totalReturn: 0, roi: 0, cagr: 0, avgCost: 0, finalPrice: 0, totalShares: 0, monthlyData: [] as any[] };
    let ts = 0, ti = 0; const md: any[] = [];
    for (let i = 0; i < prices.length; i++) {
      const p = prices[i].price; const s = monthly / p; ts += s; ti += monthly;
      md.push({ month: i + 1, date: prices[i].date, price: p, shares: Math.round(s * 10000) / 10000, invested: ti, value: Math.round(ts * p) });
    }
    const fp = prices[prices.length - 1]?.price || 0;
    const fv = Math.round(ts * fp); const tr = fv - ti;
    const r = ti > 0 ? Math.round((tr / ti) * 1000) / 10 : 0;
    const y = prices.length / 12;
    const cagr = ti > 0 && y > 0 ? Math.round(((Math.pow(fv / ti, 1 / y) - 1) * 100) * 10) / 10 : 0;
    const ac = ts > 0 ? Math.round(ti / ts * 100) / 100 : 0;
    return { totalInvested: ti, finalValue: fv, totalReturn: tr, roi: r, cagr, avgCost: ac, finalPrice: fp, totalShares: Math.round(ts * 10000) / 10000, monthlyData: md };
  }, [prices, monthly]);

  const fm = (v: number) => { if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + '万'; return v.toLocaleString(); };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">投资标的</label>
          <select value={asset} onChange={(e) => setAsset(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50">
            {assetList.map((a) => (<option key={a.key} value={a.key}>{a.name}</option>))}
          </select>
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">每月定投金额（元）</label>
          <input type="text" inputMode="numeric" value={monthlyStr} onChange={(e) => { const v = e.target.value; if (v === '' || /^\d+$/.test(v)) setMonthlyStr(v); }} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" placeholder="输入金额" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">开始日期</label>
          <input type="date" value={startDate} min={yearsAgoStr(5)} max={endDate} onChange={(e) => setStartDate(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1.5">结束日期</label>
          <input type="date" value={endDate} min={startDate} max={todayStr()} onChange={(e) => setEndDate(e.target.value)} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" />
        </div>
      </div>
      {prices.length > 0 && !loading && <div className="text-xs text-muted-foreground/50 mb-8">共 {prices.length} 个月</div>}
      {loading && <div className="rounded-xl border border-border bg-card/30 p-12 text-center mb-8"><div className="text-sm text-muted-foreground/60">正在获取历史数据...</div></div>}
      {error && <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6 text-center mb-8"><div className="text-sm text-red-400/80 mb-1">获取失败</div><div className="text-xs text-muted-foreground/60">{error}</div><button onClick={fetchData} className="mt-3 text-xs text-muted-foreground hover:text-foreground underline underline-offset-4">重试</button></div>}
      {!loading && !error && result.monthlyData.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">定投期数</div><div className="text-xl font-bold text-foreground">{result.monthlyData.length}<span className="text-xs text-muted-foreground/50 ml-1">个月</span></div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总投入</div><div className="text-xl font-bold text-foreground">{currency}{fm(result.totalInvested)}</div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">最终市值</div><div className="text-xl font-bold text-foreground">{currency}{fm(result.finalValue)}</div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">年化收益率</div><div className={`text-xl font-bold ${result.cagr >= 0 ? 'text-green-400' : 'text-red-400'}`}>{result.cagr}%</div></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总收益</div><div className={`text-lg font-bold ${result.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>{currency}{fm(result.totalReturn)} <span className="text-xs">({result.roi}%)</span></div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">平均成本</div><div className="text-lg font-bold text-foreground">{currency}{result.avgCost}</div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">期末价格</div><div className="text-lg font-bold text-foreground">{currency}{result.finalPrice}</div></div>
            <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">当前价格</div><div className="text-lg font-bold text-foreground">{currentPrice !== null ? `${currency}${currentPrice}` : '加载中...'}</div></div>
          </div>
          <div className="rounded-xl border border-border bg-card/30 p-6 mb-6">
            <div className="text-xs text-muted-foreground/60 mb-4">定投资产增长曲线</div>
            <div className="flex items-end gap-0.5 h-36">
              {result.monthlyData.map((d: any, i: number) => {
                const maxVal = Math.max(...result.monthlyData.map((x: any) => x.value), 1);
                const h = (d.value / maxVal) * 100;
                return <div key={i} className="flex-1 flex flex-col justify-end items-center" title={`${d.date}: ${currency}${fm(d.value)}`}><div className="w-full rounded-t-sm" style={{ height: `${Math.max(h, 0.5)}%`, minHeight: '1px', background: 'linear-gradient(to top, rgba(59,130,246,0.3), rgba(59,130,246,0.1))' }} /></div>;
              })}
            </div>
            <div className="flex justify-between mt-2 text-[9px] text-muted-foreground/40"><span>{result.monthlyData[0]?.date}</span><span>{result.monthlyData[result.monthlyData.length - 1]?.date}</span></div>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead><tr className="border-b border-border bg-card/30"><th className="text-left px-4 py-2.5 text-muted-foreground/60 font-normal">日期</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">价格</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">买入份额</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">累计市值</th></tr></thead>
              <tbody>
                {result.monthlyData.slice(0, 8).map((d: any) => (<tr key={d.month} className="border-b border-border/50 hover:bg-card/20"><td className="px-4 py-2 text-foreground/70">{d.date}</td><td className="text-right px-4 py-2 text-muted-foreground/60">{currency}{d.price}</td><td className="text-right px-4 py-2 text-foreground/50">{d.shares}</td><td className="text-right px-4 py-2 text-foreground/80">{currency}{fm(d.value)}</td></tr>))}
                {result.monthlyData.length > 8 && <><tr className="border-b border-border/50"><td className="px-4 py-2 text-muted-foreground/40 text-center" colSpan={4}>· · ·</td></tr>{(() => { const l = result.monthlyData[result.monthlyData.length - 1]; return (<tr className="hover:bg-card/20"><td className="px-4 py-2 text-foreground/70">{l.date}</td><td className="text-right px-4 py-2 text-muted-foreground/60">{currency}{l.price}</td><td className="text-right px-4 py-2 text-foreground/50">{l.shares}</td><td className="text-right px-4 py-2 text-foreground/80 font-medium">{currency}{fm(l.value)}</td></tr>); })()}</>}
              </tbody>
            </table>
          </div>
        </>
      )}
      <div className="mt-8 text-xs text-muted-foreground/40 text-center">{prices.length > 0 ? <>数据来源: Yahoo Finance / 新浪财经 · 投资有风险，决策需谨慎</> : <>投资有风险，决策需谨慎</>}</div>
    </div>
  );
}

/* ========== 复利计算 ========== */
function CompoundTab() {
  const [principalStr, setPrincipalStr] = useState('100000');
  const [monthlyStr, setMonthlyStr] = useState('3000');
  const [rateStr, setRateStr] = useState('8');
  const [yearsStr, setYearsStr] = useState('20');

  const principal = Number(principalStr) || 0;
  const monthly = Number(monthlyStr) || 0;
  const rate = Number(rateStr) || 0;
  const years = Number(yearsStr) || 1;

  const result = useMemo(() => {
    const mr = rate / 100 / 12; const m = years * 12;
    const fvL = principal * Math.pow(1 + mr, m);
    const fvM = monthly > 0 && mr > 0 ? monthly * ((Math.pow(1 + mr, m) - 1) / mr) : 0;
    const fv = fvL + fvM; const ti = principal + monthly * m; const tr = fv - ti;
    const roi = ti > 0 ? Math.round((tr / ti) * 1000) / 10 : 0;
    const yd: { year: number; value: number; invested: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const mm = y * 12;
      const lv = principal * Math.pow(1 + mr, mm);
      const mv = monthly > 0 && mr > 0 ? monthly * ((Math.pow(1 + mr, mm) - 1) / mr) : 0;
      yd.push({ year: y, value: Math.round(lv + mv), invested: principal + monthly * mm });
    }
    return { finalValue: Math.round(fv), totalInvested: ti, totalReturn: Math.round(tr), roi, yearlyData: yd };
  }, [principal, monthly, rate, years]);

  const maxValue = Math.max(...result.yearlyData.map((d) => d.value), 1);
  const fm = (v: number) => { if (v >= 10000) return (v / 10000).toFixed(1) + '万'; return v.toLocaleString(); };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div><label className="block text-xs text-muted-foreground mb-1.5">初始本金（元）</label><input type="text" inputMode="numeric" value={principalStr} onChange={(e) => { const v = e.target.value; if (v === '' || /^\d+$/.test(v)) setPrincipalStr(v); }} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
        <div><label className="block text-xs text-muted-foreground mb-1.5">每月定投（元）</label><input type="text" inputMode="numeric" value={monthlyStr} onChange={(e) => { const v = e.target.value; if (v === '' || /^\d+$/.test(v)) setMonthlyStr(v); }} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
        <div><label className="block text-xs text-muted-foreground mb-1.5">年化收益率（%）</label><input type="text" inputMode="decimal" value={rateStr} onChange={(e) => { const v = e.target.value; if (v === '' || /^\d*\.?\d*$/.test(v)) setRateStr(v); }} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
        <div><label className="block text-xs text-muted-foreground mb-1.5">投资年限</label><input type="text" inputMode="numeric" value={yearsStr} onChange={(e) => { const v = e.target.value; if (v === '' || /^\d+$/.test(v)) setYearsStr(v); }} className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50" /></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">最终金额</div><div className="text-xl font-bold text-foreground">¥{fm(result.finalValue)}</div></div>
        <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总投入</div><div className="text-xl font-bold text-foreground">¥{fm(result.totalInvested)}</div></div>
        <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总收益</div><div className="text-xl font-bold text-green-400">¥{fm(result.totalReturn)}</div></div>
        <div className="rounded-xl border border-border bg-card/50 p-4"><div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">收益率</div><div className="text-xl font-bold text-green-400">{result.roi}%</div></div>
      </div>
      <div className="rounded-xl border border-border bg-card/30 p-6 mb-6">
        <div className="text-xs text-muted-foreground/60 mb-6">逐年资产增长</div>
        <div className="flex items-end gap-1 h-48">
          {result.yearlyData.map((d) => { const hp = (d.value / maxValue) * 100; return <div key={d.year} className="flex-1 flex flex-col justify-end items-center"><div className="w-full rounded-t-sm bg-primary/30 hover:bg-primary/50 transition-colors" style={{ height: `${hp}%`, minHeight: '2px' }} />{d.year % 5 === 0 && <span className="text-[9px] text-muted-foreground/50 mt-1">{d.year}</span>}</div>; })}
        </div>
      </div>
      <div className="rounded-xl border border-border overflow-hidden">
        <table className="w-full text-xs">
          <thead><tr className="border-b border-border bg-card/30"><th className="text-left px-4 py-2.5 text-muted-foreground/60 font-normal">年份</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">总投入</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">资产价值</th><th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">收益</th></tr></thead>
          <tbody>{result.yearlyData.filter((d) => d.year % 5 === 0 || d.year === years).map((d) => (<tr key={d.year} className="border-b border-border/50 last:border-b-0 hover:bg-card/20"><td className="px-4 py-2.5 text-foreground/70">第 {d.year} 年</td><td className="text-right px-4 py-2.5 text-muted-foreground/60">¥{fm(d.invested)}</td><td className="text-right px-4 py-2.5 text-foreground/80">¥{fm(d.value)}</td><td className="text-right px-4 py-2.5 text-green-400/70">¥{fm(d.value - d.invested)}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}

/* ========== 主页面 ========== */
export default function InvestmentCalculator() {
  const [activeTab, setActiveTab] = useState<'dca' | 'compound'>('dca');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">投资计算器</h1>
          <p className="text-muted-foreground mb-8">定投回测看历史，复利计算看未来。</p>

          {/* Tabs */}
          <div className="flex gap-0 mb-10 border-b border-border">
            <button onClick={() => setActiveTab('dca')} className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 ${activeTab === 'dca' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              <TrendingUp size={14} /> 定投回测
            </button>
            <button onClick={() => setActiveTab('compound')} className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-b-2 ${activeTab === 'compound' ? 'border-primary text-foreground font-medium' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              <Calculator size={14} /> 复利计算
            </button>
          </div>

          {activeTab === 'dca' ? <DcaTab /> : <CompoundTab />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
