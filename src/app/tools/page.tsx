import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Calculator, ArrowRight } from 'lucide-react';

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">工具</h1>
          <p className="text-muted-foreground mb-16">自己会用到的小工具，随手搭在这里。</p>

          <div className="grid grid-cols-1 gap-5">
            <Link href="/tools/calculator" className="group rounded-xl border border-border bg-card/30 p-6 transition-all hover:border-primary/30 hover:-translate-y-0.5">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary mb-4 text-muted-foreground group-hover:text-foreground transition-colors">
                <Calculator size={18} />
              </div>
              <h3 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                投资计算器
                <ArrowRight size={12} className="text-muted-foreground/30 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
              </h3>
              <p className="text-xs text-muted-foreground/60 leading-relaxed">
                定投回测 + 复利计算，一个工具搞定。基于真实历史数据，看看你如果过去开始定投会怎样，或者规划未来的复利增长。
              </p>
            </Link>
          </div>

          <div className="mt-16 p-8 rounded-xl border border-border/50 bg-card/20 text-center">
            <p className="text-sm text-muted-foreground/60">
              有想用的小工具？欢迎
              <a href="mailto:hi@baiyongqiang.com" className="text-muted-foreground hover:text-foreground underline underline-offset-4 mx-1">邮件告诉我</a>。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
