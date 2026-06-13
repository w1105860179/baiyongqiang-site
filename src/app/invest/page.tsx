import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TrendingUp, BookOpen } from 'lucide-react';
import { getArticles } from '@/lib/articles';

export default function InvestPage() {
  const articles = getArticles('invest');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <TrendingUp size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              投资之道：于无声处听惊雷
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif max-w-2xl">
              &ldquo;天地不仁，以万物为刍狗；投资无情，以规律为准绳。&rdquo;
            </p>
          </div>

          {/* Articles List */}
          {articles.length > 0 ? (
            <div className="space-y-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/invest/${article.slug}`}
                  className="group block p-6 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 hover:border-amber-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 group-hover:bg-amber-500/20 transition-colors">
                      <BookOpen size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-semibold group-hover:text-amber-400 transition-colors">
                          {article.title}
                        </h2>
                        <span className="text-sm text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <p className="text-muted-foreground group-hover:text-foreground/80 transition-colors">
                        {article.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-5 h-5 text-amber-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>暂无文章</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
