import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BookOpen, ArrowRight } from 'lucide-react';
import { getArticles } from '@/lib/articles';

export default function ThoughtsPage() {
  const articles = getArticles('thoughts');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-emerald-500/10 text-emerald-400 mb-6">
              <BookOpen size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              随笔
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              生活感悟与思考，关于认知、成长与人际交往的随笔记录。
            </p>
          </div>

          {/* Article List */}
          <div className="space-y-4">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/thoughts/${article.slug}`}
                className="group block rounded-xl border border-border bg-card p-6 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {article.date}
                    </p>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                      {article.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground shrink-0 ml-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
