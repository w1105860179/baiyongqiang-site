import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MarkdownContent } from '@/components/markdown-content';
import { getArticle, getArticleSlugs } from '@/lib/articles';

export function generateStaticParams() {
  return getArticleSlugs('invest').map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = getArticle('invest', slug);
    return {
      title: article?.title ?? '投资',
      description: article?.description ?? '',
    };
  });
}

export default async function InvestArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle('invest', slug);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="max-w-3xl mx-auto px-6 text-center py-20">
            <h1 className="text-2xl font-bold text-foreground mb-4">
              文章未找到
            </h1>
            <Link
              href="/invest"
              className="text-primary hover:underline"
            >
              返回投资之道
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            返回投资之道
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              {article.title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              {article.date}
              {article.description && ` · ${article.description}`}
            </p>
          </div>

          {/* Article */}
          <article>
            <MarkdownContent content={article.content} />
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
