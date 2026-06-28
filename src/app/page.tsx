import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getAllArticles } from '@/lib/articles';
import { ArrowRight, Brain, TrendingUp, BookOpen, Wrench } from 'lucide-react';

const categoryLabels: Record<string, string> = {
  invest: '投资',
  ai: 'AI',
  thoughts: '认知',
};

const features = [
  { icon: Brain, label: 'AI 探索', desc: '理解技术如何重塑工作与生活', href: '/ai', color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { icon: TrendingUp, label: '投资思考', desc: '长期视角看待价值与复利', href: '/invest', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
  { icon: BookOpen, label: '终身学习', desc: '认知升级与个人成长', href: '/thoughts', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { icon: Wrench, label: '实用工具', desc: '定投回测 · 复利计算', href: '/tools', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

export default function Home() {
  const articles = getAllArticles().slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-6 w-full">

          {/* Hero */}
          <section className="py-16 md:py-24 text-center">
            <p className="text-sm text-muted-foreground/70 mb-4 tracking-wide">
              BaiYongQiang · 零售数字化从业者
            </p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 text-foreground">
              探索 · 学习 · 创造
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              用系统思维理解世界，构建长期复利的认知资产。
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
              >
                阅读文章 <ArrowRight size={14} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-border/50 text-sm text-muted-foreground hover:text-foreground hover:border-border transition-colors"
              >
                关于我
              </Link>
            </div>
          </section>

          {/* 功能卡片 */}
          <section className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`group rounded-2xl border ${item.border} ${item.bg} p-5 hover:scale-[1.02] transition-all duration-300`}
                  >
                    <div className={`w-9 h-9 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <Icon size={18} className={item.color} />
                    </div>
                    <h3 className="text-sm font-medium text-foreground mb-1">{item.label}</h3>
                    <p className="text-xs text-muted-foreground/60 leading-relaxed">{item.desc}</p>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 精选文章 */}
          <section className="py-12 border-t border-border/30">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-foreground">精选文章</h2>
              <Link
                href="/articles"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                查看全部 <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.category}/${article.slug}`}
                  className="group rounded-2xl border border-border/50 bg-card/30 p-6 hover:bg-card/50 hover:border-border transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {article.category && categoryLabels[article.category] && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full border border-border/50 text-muted-foreground/60">
                        {categoryLabels[article.category]}
                      </span>
                    )}
                    {article.date && (
                      <span className="text-xs text-muted-foreground/40">{article.date}</span>
                    )}
                  </div>
                  <h3 className="text-base font-medium text-foreground group-hover:text-foreground/80 transition-colors mb-2 leading-snug">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-sm text-muted-foreground/60 line-clamp-2 leading-relaxed">
                      {article.description}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>

          {/* 底部 */}
          <div className="py-16 text-center">
            <p className="font-serif italic text-muted-foreground/30 text-sm">
              &ldquo;Think long. Build slow. Stay curious.&rdquo;
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
