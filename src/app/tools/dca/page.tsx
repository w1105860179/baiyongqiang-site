'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

// 生成60个月模拟价格序列
function genPrices(trend: number, volatility: number, floor: number): number[] {
  const p: number[] = [100];
  for (let i = 1; i < 60; i++) {
    const change = (Math.random() - 0.5 + trend / 100) * volatility;
    p.push(Math.max(p[i - 1] + change, floor));
  }
  return p;
}

// 预设标的
const presets: Record<string, { name: string; prices: number[] }> = {
  'hs300': {
    name: '沪深300',
    prices: (() => { const p: number[] = [100]; for (let i = 1; i < 36; i++) p.push(Math.max(p[i-1] + (Math.random()-0.55)*6, 60)); for (let i = 36; i < 60; i++) p.push(Math.max(p[i-1] + (Math.random()-0.4)*5, 70)); return p; })(),
  },
  'sp500': {
    name: '标普500',
    prices: (() => { const p: number[] = [100]; for (let i = 1; i < 60; i++) p.push(Math.max(p[i-1] + (Math.random()-0.42)*3.5, 80)); return p; })(),
  },
  'nasdaq100': {
    name: '纳斯达克100',
    prices: (() => { const p: number[] = [100]; for (let i = 1; i < 60; i++) p.push(Math.max(p[i-1] + (Math.random()-0.38)*5, 70)); return p; })(),
  },
  'gold': {
    name: '黄金',
    prices: (() => { const p: number[] = [100]; for (let i = 1; i < 60; i++) p.push(Math.max(p[i-1] + (Math.random()-0.44)*2.5, 88)); return p; })(),
  },
  'btc': {
    name: 'BTC',
    prices: (() => { const p: number[] = [100]; for (let i = 1; i < 60; i++) p.push(Math.max(p[i-1] + (Math.random()-0.48)*12, 25)); return p; })(),
  },
};

export default function DcaBacktest() {
  const [asset, setAsset] = useState('hs300');
  const [monthlyStr, setMonthlyStr] = useState('5000');
  const [months, setMonths] = useState(36);

  const monthly = Number(monthlyStr) || 0;

  const result = useMemo(() => {
    const prices = presets[asset].prices;
    const actualMonths = Math.min(months, prices.length);

    let totalShares = 0;
    let totalInvested = 0;
    const monthlyData: { month: number; price: number; shares: number; invested: number; value: number }[] = [];

    if (monthly > 0) {
      for (let i = 0; i < actualMonths; i++) {
        const price = prices[i];
        const shares = monthly / price;
        totalShares += shares;
        totalInvested += monthly;
        monthlyData.push({
          month: i + 1,
          price: Math.round(price * 100) / 100,
          shares: Math.round(shares * 100) / 100,
          invested: totalInvested,
          value: Math.round(totalShares * price),
        });
      }
    }

    const finalPrice = prices[actualMonths - 1] || 0;
    const finalValue = Math.round(totalShares * finalPrice);
    const totalReturn = finalValue - totalInvested;
    const roi = totalInvested > 0 ? Math.round((totalReturn / totalInvested) * 1000) / 10 : 0;
    const avgCost = totalShares > 0 ? Math.round(totalInvested / totalShares * 100) / 100 : 0;

    return {
      totalInvested,
      finalValue,
      totalReturn,
      roi,
      avgCost,
      finalPrice: Math.round(finalPrice * 100) / 100,
      totalShares: Math.round(totalShares * 100) / 100,
      monthlyData,
    };
  }, [asset, monthly, months]);

  const formatWan = (v: number) => {
    if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + '万';
    return v.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            定投回测
          </h1>
          <p className="text-muted-foreground mb-12">
            模拟每月定额买入，看看长期定投的效果。
          </p>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                投资标的
              </label>
              <select
                value={asset}
                onChange={(e) => setAsset(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
              >
                {Object.entries(presets).map(([key, val]) => (
                  <option key={key} value={key}>{val.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                每月定投金额（元）
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={monthlyStr}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === '' || /^\d+$/.test(v)) {
                    setMonthlyStr(v);
                  }
                }}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
                placeholder="输入金额"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                定投月数
              </label>
              <input
                type="range"
                min={12}
                max={60}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full mt-3"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground/50 mt-0.5">
                <span>12个月</span>
                <span>{months}个月</span>
                <span>60个月</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总投入</div>
              <div className="text-xl font-bold text-foreground">
                ¥{formatWan(result.totalInvested)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">最终市值</div>
              <div className="text-xl font-bold text-foreground">
                ¥{formatWan(result.finalValue)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总收益</div>
              <div className={`text-xl font-bold ${result.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ¥{formatWan(result.totalReturn)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">收益率</div>
              <div className={`text-xl font-bold ${result.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {result.roi}%
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="rounded-lg border border-border/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">平均成本</div>
              <div className="text-sm text-foreground/80">¥{result.avgCost}</div>
            </div>
            <div className="rounded-lg border border-border/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">当前价格</div>
              <div className="text-sm text-foreground/80">¥{result.finalPrice}</div>
            </div>
          </div>

          {/* Asset growth chart — only if there's data */}
          {result.monthlyData.length > 0 && (
            <div className="rounded-xl border border-border bg-card/30 p-6 mb-6">
              <div className="text-xs text-muted-foreground/60 mb-4">定投资产增长曲线</div>
              <div className="flex items-end gap-0.5 h-36">
                {result.monthlyData.map((d, i) => {
                  const maxVal = Math.max(...result.monthlyData.map((x) => x.value), 1);
                  const valueH = (d.value / maxVal) * 100;
                  return (
                    <div
                      key={i}
                      className="flex-1 flex flex-col justify-end items-center"
                      title={`第${d.month}月: 投入¥${formatWan(d.invested)}, 市值¥${formatWan(d.value)}`}
                    >
                      <div
                        className="w-full rounded-t-sm"
                        style={{
                          height: `${Math.max(valueH, 0.5)}%`,
                          minHeight: '1px',
                          background: 'linear-gradient(to top, rgba(59,130,246,0.3), rgba(59,130,246,0.1))',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-2 text-[9px] text-muted-foreground/40">
                <span>第1月</span>
                <span>第{result.monthlyData.length}月</span>
              </div>
            </div>
          )}

          {/* Monthly detail table */}
          {result.monthlyData.length > 0 && (
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border bg-card/30">
                    <th className="text-left px-4 py-2.5 text-muted-foreground/60 font-normal">月份</th>
                    <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">价格</th>
                    <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">买入份额</th>
                    <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">累计市值</th>
                  </tr>
                </thead>
                <tbody>
                  {result.monthlyData.slice(0, 12).map((d) => (
                    <tr key={d.month} className="border-b border-border/50 hover:bg-card/20 transition-colors">
                      <td className="px-4 py-2 text-foreground/70">第 {d.month} 月</td>
                      <td className="text-right px-4 py-2 text-muted-foreground/60">¥{d.price}</td>
                      <td className="text-right px-4 py-2 text-foreground/50">{d.shares}</td>
                      <td className="text-right px-4 py-2 text-foreground/80">¥{formatWan(d.value)}</td>
                    </tr>
                  ))}
                  {result.monthlyData.length > 12 && (
                    <>
                      <tr className="border-b border-border/50">
                        <td className="px-4 py-2 text-muted-foreground/40 text-center" colSpan={4}>
                          · · ·
                        </td>
                      </tr>
                      {(() => {
                        const last = result.monthlyData[result.monthlyData.length - 1];
                        return (
                          <tr className="hover:bg-card/20 transition-colors">
                            <td className="px-4 py-2 text-foreground/70">第 {last.month} 月</td>
                            <td className="text-right px-4 py-2 text-muted-foreground/60">¥{last.price}</td>
                            <td className="text-right px-4 py-2 text-foreground/50">{last.shares}</td>
                            <td className="text-right px-4 py-2 text-foreground/80 font-medium">¥{formatWan(last.value)}</td>
                          </tr>
                        );
                      })()}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 text-xs text-muted-foreground/40 text-center">
            数据为模拟演示，不代表真实市场表现。投资有风险，决策需谨慎。
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
