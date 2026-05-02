import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          &copy; 2026 BaiYongQiang &middot; Digital Garden
        </p>
        <p className="text-sm italic text-muted-foreground font-serif">
          &ldquo;Reborn with AI, defined by lifelong learning.&rdquo;
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/retail"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            零售
          </Link>
          <Link
            href="/ai"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            AI
          </Link>
          <Link
            href="/invest"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            投资
          </Link>
          <Link
            href="/about"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            关于
          </Link>
        </div>
      </div>
    </footer>
  );
}
