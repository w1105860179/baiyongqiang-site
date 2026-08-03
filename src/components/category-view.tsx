import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getArticles } from '@/lib/articles';
import { Clock } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  invest: '投资',
  ai: 'AI',
  thoughts: '认知',
};

export function CategoryView({
  category,
  title,
  subtitle,
}: {
  category: string;
  title: string;
  subtitle: string;
}) {
  const articles = getArticles(category);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            {title}
          </h1>
          <p className="text-muted-foreground mb-12">{subtitle}</p>

          <div className="space-y-0">
            {articles.map((article, index) => (
              <Link
                key={article.slug}
                href={`/${category}/${article.slug}`}
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

          {articles.length === 0 && (
            <div className="text-center py-12 text-muted-foreground/60">
              暂无文章
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
