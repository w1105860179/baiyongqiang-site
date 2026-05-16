import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Store, Brain, TrendingUp, BookOpen, ArrowRight } from 'lucide-react';

const cards = [
  {
    href: '/retail',
    icon: Store,
    title: '零售信息化',
    description: '门店系统与运营优化',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconColor: 'text-blue-400',
  },
  {
    href: '/ai',
    icon: Brain,
    title: 'AI 探索',
    description: '技术在场景中的应用',
    gradient: 'from-purple-500/20 to-pink-500/20',
    iconColor: 'text-purple-400',
  },
  {
    href: '/invest',
    icon: TrendingUp,
    title: '投资与经济',
    description: '市场与长期价值判断',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconColor: 'text-amber-400',
  },
  {
    href: '/thoughts',
    icon: BookOpen,
    title: '随笔',
    description: '生活感悟与思考',
    gradient: 'from-emerald-500/20 to-teal-500/20',
    iconColor: 'text-emerald-400',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <main className="flex-1 flex flex-col justify-center pt-16">
        <div className="max-w-6xl mx-auto px-6 w-full py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              <span className="bg-gradient-to-b from-white via-white/90 to-white/50 bg-clip-text text-transparent">
                BaiYongQiang
              </span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              零售行业数字化解决方案从业者
              <br />
              技术 &times; 商业 &times; 长期认知
            </p>
          </div>

          {/* Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {cards.map((card) => (
              <Link key={card.href} href={card.href} className="group">
                <div className="relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
                  {/* Gradient glow on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-5 ${card.iconColor}`}
                    >
                      <card.icon size={22} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                      {card.title}
                      <ArrowRight
                        size={14}
                        className="text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      />
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Slogan */}
          <div className="mt-20 text-center">
            <p className="font-serif italic text-white/60 text-lg">
              &ldquo;Reborn with AI, defined by lifelong learning.&rdquo;
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
