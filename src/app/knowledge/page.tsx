import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

interface MapNode {
  label: string;
  href?: string;
}

const pillars: { key: string; title: string; subtitle: string; nodes: MapNode[] }[] = [
  {
    key: 'ai',
    title: 'AI',
    subtitle: 'Exploring how AI reshapes work, learning, and daily life.',
    nodes: [
      { label: '也算亲手用了AI', href: '/ai/my-first-ai-website' },
      { label: '硅基启蒙', href: '/ai/silicon-enlightenment' },
      { label: 'AI 与个人实践', href: '/ai' },
    ],
  },
  {
    key: 'invest',
    title: 'Investing',
    subtitle: 'Long-term thinking on value, risk, and compound growth.',
    nodes: [
      { label: '机会成本', href: '/invest/opportunity-cost' },
      { label: '沉没成本', href: '/invest/sunk-cost' },
      { label: '说下投资和投机', href: '/invest/investment-vs-speculation' },
      { label: '为什么是泡泡玛特', href: '/invest/why-popmart' },
      { label: '投资之道', href: '/invest/wealth-source' },
    ],
  },
  {
    key: 'thoughts',
    title: 'Lifelong Learning',
    subtitle: 'Notes on cognition, decision-making, and personal growth.',
    nodes: [
      { label: '丢人就像丢钱一样', href: '/thoughts/fear-of-embarrassment' },
      { label: '怎么能成长的最快', href: '/thoughts/multi-dimensional-growth' },
      { label: '复杂并不等于高级', href: '/thoughts/complexity-vs-simplicity' },
      { label: '曾经坚持但现在改变的观点', href: '/thoughts/changed-perspectives' },
      { label: '开启微行动，成就大改变', href: '/thoughts/my-new-article' },
      { label: '傲慢与偏见', href: '/thoughts/arrogance-and-prejudice' },
    ],
  },
];

export default function KnowledgeMap() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-6 w-full py-20">
          <div className="text-center mb-20">
            <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">Knowledge Map</h1>
            <p className="text-muted-foreground/60 text-sm">AI × Investing × Lifelong Learning</p>
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {pillars.map((pillar, pi) => (
              <div key={pillar.key} className="relative">
                {/* Connector bar at top */}
                {pi > 0 && (
                  <div className="hidden md:block absolute top-0 left-0 w-full h-0.5 bg-border/30 -translate-x-1/2" />
                )}

                <div className="rounded-xl border border-border/50 bg-card/10 p-6 h-full">
                  <div className={`text-xs font-medium uppercase tracking-wider mb-3 ${
                    pillar.key === 'ai' ? 'text-purple-400/70' :
                    pillar.key === 'invest' ? 'text-amber-400/70' :
                    'text-emerald-400/70'
                  }`}>
                    {pillar.title}
                  </div>
                  <p className="text-xs text-muted-foreground/50 mb-6 leading-relaxed">
                    {pillar.subtitle}
                  </p>

                  <div className="space-y-2.5">
                    {pillar.nodes.map((node) => (
                      node.href ? (
                        <Link
                          key={node.label}
                          href={node.href}
                          className="block text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 px-3 rounded-lg hover:bg-card/30 border border-transparent hover:border-border/30"
                        >
                          {node.label}
                        </Link>
                      ) : (
                        <span
                          key={node.label}
                          className="block text-sm text-muted-foreground/40 py-1.5 px-3"
                        >
                          {node.label}
                        </span>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom: connecting threads */}
          <div className="text-center mt-16">
            <p className="text-xs text-muted-foreground/30 font-serif italic">
              &ldquo;Everything is connected. AI is the lens, Investing is the practice, Learning is the foundation.&rdquo;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
