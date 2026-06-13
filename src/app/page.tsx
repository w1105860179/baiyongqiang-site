import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllArticles } from '@/lib/articles';
import { ArrowRight } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  invest: '投资',
  ai: 'AI',
  thoughts: '随笔',
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
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                BaiYongQiang
              </span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              投资思考 · 认知成长 · AI 实践
            </p>
            <p className="mt-2 text-sm text-muted-foreground/60">
              零售数字化从业者，持续学习者。在这里记录思考，沉淀认知。
            </p>
          </div>

          {/* Currently — 极简文字列表 */}
          <div className="mb-20">
            <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-5">
              § Currently
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider w-16">Reading</span>
                <span className="text-foreground/70">投资、认知心理学、比特币</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider w-16">Writing</span>
                <span className="text-foreground/70">公众号「深海湖说」周更</span>
              </div>
              <div className="flex items-baseline gap-4">
                <span className="text-[10px] text-muted-foreground/40 uppercase tracking-wider w-16">Building</span>
                <span className="text-foreground/70">这个网站和投资小工具</span>
              </div>
            </div>
          </div>

          {/* 文章流 */}
          <div>
            <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-8">
              § Writings
            </h2>
            <div className="space-y-0">
              {articles.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/${article.category}/${article.slug}`}
                  className="group block py-6 border-b border-border/50 last:border-b-0 transition-colors hover:border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
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
                  <h3 className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors leading-snug">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="mt-1.5 text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                浏览全部文章
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Slogan */}
          <div className="mt-24 text-center">
            <p className="font-serif italic text-white/40 text-base">
              &ldquo;Reborn with AI, defined by lifelong learning.&rdquo;
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
