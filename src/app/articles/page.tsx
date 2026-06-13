import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllArticles } from '@/lib/articles';
import { useState } from 'react';

const categoryLabels: Record<string, string> = {
  invest: 'Investing',
  ai: 'AI',
  thoughts: 'Learning',
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? articles
    : articles.filter((a) => a.category === filter);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            Writings
          </h1>
          <p className="text-muted-foreground mb-8">
            AI × Investing × Lifelong Learning
          </p>

          {/* 分类筛选 */}
          <div className="flex gap-2 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                filter === 'all'
                  ? 'border-primary/30 bg-primary/5 text-foreground'
                  : 'border-border/50 text-muted-foreground hover:text-foreground'
              }`}
            >
              All
            </button>
            {Object.entries(categoryLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  filter === key
                    ? 'border-primary/30 bg-primary/5 text-foreground'
                    : 'border-border/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="space-y-0">
            {filtered.map((article, index) => (
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
