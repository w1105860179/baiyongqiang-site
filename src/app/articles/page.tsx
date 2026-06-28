import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllArticles } from '@/lib/articles';
import { ArrowRight, Clock } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  invest: '投资',
  ai: 'AI',
  thoughts: '认知',
};

const filterOptions = [
  { key: 'all', label: '全部' },
  { key: 'invest', label: '投资' },
  { key: 'ai', label: 'AI' },
  { key: 'thoughts', label: '认知' },
];

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const validFilter =
    filter && filterOptions.some((opt) => opt.key === filter) ? filter : 'all';

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <ArticlesContent filter={validFilter} />
      </main>
      <Footer />
    </div>
  );
}

function ArticlesContent({ filter }: { filter: string }) {
  const articles = getAllArticles();
  const filtered =
    filter === 'all'
      ? articles
      : articles.filter((a) => a.category === filter);

  return (
    <div className="max-w-3xl mx-auto px-6 w-full py-20">
      <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
        文章
      </h1>
      <p className="text-muted-foreground mb-8">
        AI × 投资 × 终身学习
      </p>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-12">
        {filterOptions.map((opt) => (
          <Link
            key={opt.key}
            href={opt.key === 'all' ? '/articles' : `/articles?filter=${opt.key}`}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filter === opt.key
                ? 'border-primary/30 bg-primary/5 text-foreground'
                : 'border-border/50 text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            {opt.label}
          </Link>
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
              {article.readingTime && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground/40">
                  <Clock size={12} />
                  {article.readingTime}
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

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground/60">
          暂无文章
        </div>
      )}
    </div>
  );
}
