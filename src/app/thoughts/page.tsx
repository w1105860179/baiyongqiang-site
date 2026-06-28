import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getArticles } from '@/lib/articles';
import { BookOpen, Clock } from 'lucide-react';

export default function ThoughtsIndex() {
  const articles = getArticles('thoughts');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen size={20} className="text-emerald-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">终身学习</h1>
              <p className="text-sm text-muted-foreground/60">认知、决策与个人成长的笔记与思考。</p>
            </div>
          </div>

          <div className="space-y-3">
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/thoughts/${article.slug}`}
                className="block rounded-xl border border-border/50 bg-card/30 p-5 hover:bg-card/50 transition-colors group"
              >
                <h3 className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-2">
                  {article.title}
                </h3>
                {article.description && (
                  <p className="text-sm text-muted-foreground/60 line-clamp-2 mb-3">{article.description}</p>
                )}
                <div className="flex items-center gap-4 text-xs text-muted-foreground/40">
                  {article.date && <span>{article.date}</span>}
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {article.readingTime}
                  </span>
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
