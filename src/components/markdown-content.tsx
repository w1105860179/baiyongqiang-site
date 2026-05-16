'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function MarkdownContent({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold text-foreground mb-4 mt-10">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-semibold text-foreground mb-3 mt-8">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-muted-foreground leading-relaxed mb-4">
            {children}
          </p>
        ),
        strong: ({ children }) => (
          <strong className="text-foreground font-semibold">{children}</strong>
        ),
        blockquote: ({ children }) => (
          <div className="border-l-2 border-primary/50 bg-primary/5 pl-4 py-2 my-6 italic text-foreground">
            {children}
          </div>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside text-muted-foreground space-y-2 mb-4">
            {children}
          </ol>
        ),
        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
        hr: () => <hr className="border-border my-8" />,
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
