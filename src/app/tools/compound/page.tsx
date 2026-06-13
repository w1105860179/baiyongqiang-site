'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function CompoundCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [monthly, setMonthly] = useState(3000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);

  const result = useMemo(() => {
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    
    // 一次性本金复利
    const fvLump = principal * Math.pow(1 + monthlyRate, months);
    
    // 每月定投复利
    const fvMonthly = monthly > 0
      ? monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
      : 0;
    
    const finalValue = fvLump + fvMonthly;
    const totalInvested = principal + monthly * months;
    const totalReturn = finalValue - totalInvested;
    const roi = totalInvested > 0 ? ((totalReturn / totalInvested) * 100) : 0;

    // 生成逐年数据
    const yearlyData: { year: number; value: number; invested: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const lv = principal * Math.pow(1 + monthlyRate, m);
      const mv = monthly > 0
        ? monthly * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate)
        : 0;
      yearlyData.push({
        year: y,
        value: Math.round(lv + mv),
        invested: principal + monthly * m,
      });
    }

    return {
      finalValue: Math.round(finalValue),
      totalInvested,
      totalReturn: Math.round(totalReturn),
      roi: Math.round(roi * 10) / 10,
      yearlyData,
    };
  }, [principal, monthly, rate, years]);

  const maxValue = Math.max(...result.yearlyData.map((d) => d.value), 1);

  const formatWan = (v: number) => {
    if (v >= 10000) return (v / 10000).toFixed(1) + '万';
    return v.toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            复利计算器
          </h1>
          <p className="text-muted-foreground mb-12">
            看看时间和复利能带来什么变化。
          </p>

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                初始本金（元）
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                每月定投（元）
              </label>
              <input
                type="number"
                value={monthly}
                onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                年化收益率（%）
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value) || 0)}
                step="0.1"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1.5">
                投资年限
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value) || 1)}
                max={60}
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">最终金额</div>
              <div className="text-xl font-bold text-foreground">
                ¥{formatWan(result.finalValue)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总投入</div>
              <div className="text-xl font-bold text-foreground">
                ¥{formatWan(result.totalInvested)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">总收益</div>
              <div className="text-xl font-bold text-green-400">
                ¥{formatWan(result.totalReturn)}
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card/50 p-4">
              <div className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">收益率</div>
              <div className="text-xl font-bold text-green-400">
                {result.roi}%
              </div>
            </div>
          </div>

          {/* Bar chart */}
          <div className="rounded-xl border border-border bg-card/30 p-6">
            <div className="text-xs text-muted-foreground/60 mb-6">逐年资产增长</div>
            <div className="flex items-end gap-1 h-48">
              {result.yearlyData.map((d) => {
                const heightPct = (d.value / maxValue) * 100;
                return (
                  <div
                    key={d.year}
                    className="flex-1 flex flex-col justify-end items-center group relative"
                  >
                    <div
                      className="w-full rounded-t-sm bg-primary/30 group-hover:bg-primary/50 transition-colors"
                      style={{ height: `${heightPct}%`, minHeight: '2px' }}
                    />
                    {d.year % 5 === 0 && (
                      <span className="text-[9px] text-muted-foreground/50 mt-1">
                        {d.year}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Yearly table */}
          <div className="mt-6 rounded-xl border border-border overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border bg-card/30">
                  <th className="text-left px-4 py-2.5 text-muted-foreground/60 font-normal">年份</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">总投入</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">资产价值</th>
                  <th className="text-right px-4 py-2.5 text-muted-foreground/60 font-normal">收益</th>
                </tr>
              </thead>
              <tbody>
                {result.yearlyData.filter((d) => d.year % 5 === 0 || d.year === years).map((d) => (
                  <tr key={d.year} className="border-b border-border/50 last:border-b-0 hover:bg-card/20 transition-colors">
                    <td className="px-4 py-2.5 text-foreground/70">第 {d.year} 年</td>
                    <td className="text-right px-4 py-2.5 text-muted-foreground/60">¥{formatWan(d.invested)}</td>
                    <td className="text-right px-4 py-2.5 text-foreground/80">¥{formatWan(d.value)}</td>
                    <td className="text-right px-4 py-2.5 text-green-400/70">¥{formatWan(d.value - d.invested)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
