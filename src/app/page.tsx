import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowRight, Wrench } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20 md:py-28">
          
          {/* Hero */}
          <div className="mb-20">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                BaiYongQiang
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              AI &times; Investing &times; Lifelong Learning
            </p>
            <p className="mt-2 text-sm text-muted-foreground/40 font-serif italic">
              Think long. Build slow. Stay curious.
            </p>
            <div className="mt-8">
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                浏览全部文章 <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 工具入口 */}
          <Link
            href="/tools"
            className="group flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/20 hover:bg-card/30 transition-colors"
          >
            <Wrench size={20} className="text-muted-foreground/50" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-foreground mb-0.5">投资工具</h3>
              <p className="text-xs text-muted-foreground/60">定投回测 · 复利计算 · 市场数据</p>
            </div>
            <ArrowRight size={16} className="text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors" />
          </Link>

        </div>
      </main>

      <Footer />
    </div>
  );
}
