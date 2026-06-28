import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">
          &copy; 2026 BaiYongQiang
        </p>
        <p className="text-sm italic text-muted-foreground font-serif">
          &ldquo;Think long. Build slow. Stay curious.&rdquo;
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/articles"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            文章
          </Link>
          <Link
            href="/tools"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            工具
          </Link>
          <Link
            href="/about"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            关于我
          </Link>
        </div>
      </div>
    </footer>
  );
}
