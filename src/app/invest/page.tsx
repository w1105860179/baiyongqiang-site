import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TrendingUp, Shield, Diamond, Flame } from 'lucide-react';

const sections = [
  {
    icon: TrendingUp,
    iconColor: 'text-amber-400',
    title: '均值回归：市场的"天道"',
    borderClass: 'border-l-amber-500/40',
    items: [
      {
        subtitle: '盈亏同源',
        content:
          '你靠运气赚到的钱，往往会靠实力亏掉。理解"术"的边界，才能守住"道"的果实。',
      },
      {
        subtitle: '周期的宿命',
        content:
          '万物皆有周期，繁荣背后潜伏着萧条，阴极必阳。在投资中，比寻找机会更重要的，是学会在周期中等待。',
      },
    ],
  },
  {
    icon: Shield,
    iconColor: 'text-blue-400',
    title: '认知偏差：人性的"心魔"',
    borderClass: 'border-l-blue-500/40',
    items: [
      {
        subtitle: '知行合一',
        content:
          '买入卖出可能只需要一瞬间，但要在极端行情下按兵不动，需要一生的修行。',
      },
      {
        subtitle: '反直觉思考',
        content:
          '大众恐惧时贪婪，大众贪婪时恐惧。这不仅是策略，更是对人性弱点的逆向利用。',
      },
    ],
  },
  {
    icon: Diamond,
    iconColor: 'text-purple-400',
    title: '财富的本质：认知的变现',
    borderClass: 'border-l-purple-500/40',
    items: [
      {
        subtitle: '解构底层逻辑',
        content:
          '正如分析一个系统的代码结构，投资需要我们剥离表象的波动，看清价值交换的本质。',
      },
      {
        subtitle: '长期主义',
        content:
          '在充满随机性的市场里，唯一能对抗不确定性的，就是选择站在概率的一方，并给时间以耐心。',
      },
    ],
  },
  {
    icon: Flame,
    iconColor: 'text-rose-400',
    title: '守弱与不争',
    borderClass: 'border-l-rose-500/40',
    items: [
      {
        subtitle: '避开拥挤',
        content: '最好的机会往往不在聚光灯下。',
      },
      {
        subtitle: '容错空间',
        content:
          '永远不要把自己置于"必须赢"的悬崖边缘，留足安全边际，才是长存之道。',
      },
    ],
  },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 text-amber-400 mb-6">
              <TrendingUp size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              投资之道：于无声处听惊雷
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif max-w-2xl">
              &ldquo;天地不仁，以万物为刍狗；投资无情，以规律为准绳。&rdquo;
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
                <div className={`space-y-4 pl-6 border-l-2 ${section.borderClass}`}>
                  {section.items.map((item) => (
                    <div
                      key={item.subtitle}
                      className="rounded-xl border border-border bg-card p-6"
                    >
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Link to sub-article */}
          <div className="mt-16">
            <Link
              href="/invest/source"
              className="group block rounded-xl border border-border bg-card p-6 hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-amber-400 mb-1 uppercase tracking-wider">
                    延伸阅读
                  </p>
                  <h3 className="text-lg font-semibold text-foreground">
                    财富的源头与本质
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    钱从哪里来？穿透表象，回归常识与公理。
                  </p>
                </div>
                <div className="text-muted-foreground group-hover:text-amber-400 transition-colors">
                  &rarr;
                </div>
              </div>
            </Link>
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
