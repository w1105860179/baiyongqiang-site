import Link from 'next/link';
import { Brain, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getArticles } from '@/lib/articles';

export default function AIPage() {
  const articles = getArticles('ai');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 mb-6">
              <Brain size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              AI 探索
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif max-w-2xl">
              站在 2026 年的节点，我们正目睹一场关于生产力与存在意义的彻底重塑。
            </p>
          </div>

          {/* Article list */}
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/ai/${article.slug}`}
                className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:bg-card/80 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {article.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground/60">
                      {article.date}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="shrink-0 text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all mt-1"
                  />
                </div>
              </Link>
            ))}

            {articles.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                暂无文章，敬请期待...
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
