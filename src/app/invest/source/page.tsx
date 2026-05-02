import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, Coins, Building2, Target, Search } from 'lucide-react';

const sections = [
  {
    icon: Coins,
    iconColor: 'text-amber-400',
    title: '钱从哪里来？',
    content:
      '大家都在忙着赚钱，社会上的钱也越来越多，那整个社会"多出来的钱"到底是从哪里的？财富的增长并非魔法，而是由三个核心要素驱动的：',
    items: [
      {
        label: '自然资源',
        desc: '地球赋予的原始生产资料。',
      },
      {
        label: '劳动',
        desc: '人类体力的投入。',
      },
      {
        label: '技术',
        desc: '人类智慧对生产效率的改进。',
      },
    ],
    conclusion:
      '人类把石头磨成斧头（技术），去森林砍树（劳动+资源），得到了更多的木头（总产量提高）。人类通过改进技术、投入劳动，不断提高社会总产量，这是财富增长的终极动力。',
  },
  {
    icon: Building2,
    iconColor: 'text-blue-400',
    title: '组织的进化：现代公司与资本',
    items: [
      {
        label: '现代公司制度',
        desc: '将资源、劳动和技术高效组织在一起的容器。',
      },
      {
        label: '现代资本市场',
        desc: '为这个容器提供养分的血液循环系统。',
      },
    ],
  },
  {
    icon: Target,
    iconColor: 'text-purple-400',
    title: '投资的本质：把钱扔进真实的组织',
    content:
      '投资绝不是屏幕上波动的红色或绿色数字，它是一个非常具体的动作：',
    quote:
      '投资就是我们将闲置的资本，投入到一个真实的、希望用这笔钱创造更多财富的组织里。',
    conclusion: '如果你忘记了这一点，投资就会变成赌博。',
  },
  {
    icon: Search,
    iconColor: 'text-cyan-400',
    title: '穿透表象：回归常识与公理',
    content:
      '无论金融产品名字换成什么，无论技术包装得多么深奥，作为投资者，必须死磕这三个问题：',
    items: [
      { label: '底层资产是什么？', desc: '你的钱到底买到了什么？' },
      {
        label: '钱去哪了？',
        desc: '是在实验室研发技术，还是在工厂生产产品？',
      },
      {
        label: '回报的来源是什么？',
        desc: '它是否满足这个世界最基本的常识与公理？',
      },
    ],
  },
];

export default function InvestSourcePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/invest"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            返回投资之道
          </Link>

          {/* Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              财富的源头与本质
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif max-w-2xl">
              &ldquo;太多人把投资理财看作一个抽象的数字游戏，却忘记了钱必须投向真实的财富创造过程。&rdquo;
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary ${section.iconColor}`}
                  >
                    <section.icon size={18} />
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>

                {section.content && (
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.items && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {section.items.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-border bg-card p-5"
                      >
                        <h3 className="text-base font-semibold text-foreground mb-1">
                          {item.label}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {section.quote && (
                  <div className="rounded-xl border-l-2 border-primary/50 bg-primary/5 p-6 my-4 italic text-foreground">
                    {section.quote}
                  </div>
                )}

                {section.conclusion && (
                  <p className="text-muted-foreground leading-relaxed">
                    {section.conclusion}
                  </p>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion */}
          <div className="mt-16 rounded-xl border border-primary/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-8">
            <h2 className="text-xl font-bold mb-4">结语</h2>
            <p className="text-muted-foreground leading-relaxed">
              如果不了解回报来源，就不要轻易出手。真正的投资，是看清财富流转的路径，并选择站在能创造真实价值的一方。
            </p>
          </div>

          <p className="text-xs text-muted-foreground text-right mt-8">
            Last updated: May 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
