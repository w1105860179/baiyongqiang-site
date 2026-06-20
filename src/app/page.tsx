import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllArticles } from '@/lib/articles';
import { ArrowRight, Wrench } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  invest: 'Investing',
  ai: 'AI',
  thoughts: 'Learning',
};

export default function Home() {
  const articles = getAllArticles();

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
          </div>

          {/* 全部文章 */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em]">
                Writings
              </h2>
              <Link
                href="/knowledge"
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Knowledge Map
                <ArrowRight size={12} />
              </Link>
            </div>
            <div className="space-y-0">
              {articles.slice(0, 8).map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/${article.category}/${article.slug}`}
                  className="group block py-5 border-b border-border/50 last:border-b-0 transition-colors hover:border-border"
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="text-[11px] text-muted-foreground/40 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {article.category && categoryLabels[article.category] && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground/60">
                        {categoryLabels[article.category]}
                      </span>
                    )}
                    {article.date && (
                      <span className="text-xs text-muted-foreground/40">
                        {article.date}
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-foreground group-hover:text-foreground/80 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="mt-1 text-xs text-muted-foreground/60 line-clamp-1 leading-relaxed">
                      {article.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* 工具入口 */}
          <div className="mt-20">
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

        </div>
      </main>

      <Footer />
    </div>
  );
}
