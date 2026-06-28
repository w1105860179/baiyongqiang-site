import { notFound } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MarkdownContent } from '@/components/markdown-content';
import { getArticle } from '@/lib/articles';

export default async function InvestArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle('invest', slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-6">
          <div className="mb-2">
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground/60">投资</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">{article.title}</h1>
          {article.description && <p className="text-muted-foreground/60 mb-10">{article.description}</p>}
          <MarkdownContent content={article.content} />
        </article>
      </main>
      <Footer />
    </div>
  );
}
