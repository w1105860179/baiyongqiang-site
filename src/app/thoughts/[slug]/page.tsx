import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MarkdownContent } from '@/components/markdown-content';
import { getArticle, getRelatedArticles } from '@/lib/articles';
import { ArrowLeft, Clock } from 'lucide-react';

export default async function ThoughtsArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle('thoughts', slug);
  if (!article) notFound();

  const related = getRelatedArticles('thoughts', slug, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-6">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} /> 返回文章列表
          </Link>

          <div className="mb-3">
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground/60">认知</span>
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4">{article.title}</h1>

          {article.description && (
            <p className="text-muted-foreground/60 mb-4">{article.description}</p>
          )}

          <div className="flex items-center gap-4 text-xs text-muted-foreground/40 mb-10">
            {article.date && <span>{article.date}</span>}
            <span className="inline-flex items-center gap-1">
              <Clock size={12} /> {article.readingTime}
            </span>
          </div>

          <MarkdownContent content={article.content} />
        </article>

        {related.length > 0 && (
          <section className="max-w-3xl mx-auto px-6 mt-16 pt-10 border-t border-border/30">
            <h2 className="text-sm font-medium text-foreground mb-5">相关文章</h2>
            <div className="space-y-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/thoughts/${item.slug}`}
                  className="block rounded-lg border border-border/50 bg-card/30 p-4 hover:bg-card/50 transition-colors"
                >
                  <h3 className="text-sm font-medium text-foreground mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-muted-foreground/60 line-clamp-1">{item.description}</p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
