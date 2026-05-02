import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Brain, Rocket, Globe, Lightbulb } from 'lucide-react';

export default function AIPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-purple-500/10 text-purple-400 mb-6">
              <Brain size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              硅基启蒙：AI 时代的全球重构
            </h1>
            <p className="mt-4 text-lg text-muted-foreground italic font-serif max-w-2xl">
              &ldquo;Reborn with AI, defined by lifelong learning.&rdquo;
              ——站在 2026 年的节点，我们正目睹一场关于生产力与存在意义的彻底重塑。
            </p>
          </div>

          {/* Section 1 */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-purple-400">
                <Rocket size={18} />
              </div>
              <h2 className="text-2xl font-bold">奇点临近：从工具到智慧的跃迁</h2>
            </div>
            <div className="space-y-4 pl-4 border-l-2 border-purple-500/30">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  重构生产关系
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI 正在抹平全球的信息差，让一个偏远地区的开发者也能通过
                  Prompt 调动顶级生产力。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  知识的民主化
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI
                  打破了专业知识的壁垒。复杂的科学、艺术与技术不再是少数精英的专利，而是每个人都能随手调用的&ldquo;大脑插件&rdquo;。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  从碳基到硅基
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  如果说工业革命延伸了人类的手脚，那么 AI
                  则是在尝试外挂人类的大脑，实现人类智慧的第二次指数级扩张。
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-cyan-400">
                <Globe size={18} />
              </div>
              <h2 className="text-2xl font-bold">
                数字化生存：在确定性中寻找可能
              </h2>
            </div>
            <div className="space-y-4 pl-4 border-l-2 border-cyan-500/30">
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  理解与生成
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  AI
                  的本质是对世界进行概率建模。它通过万亿级的参数去拟合人类的逻辑，让原本复杂、非线性的世界运行规律变得有迹可循。
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  认知的军备竞赛
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  在未来的全球格局中，获取信息的能力不再重要，
                  <strong className="text-foreground">提问的能力</strong>
                  （The Art of Asking）与
                  <strong className="text-foreground">逻辑归纳能力</strong>
                  才是核心。
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-amber-400">
                <Lightbulb size={18} />
              </div>
              <h2 className="text-2xl font-bold">终身学习者的使命</h2>
            </div>
            <div className="rounded-xl border border-primary/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                在 AI
                定义的时代，我始终坚信：&ldquo;重新出生&rdquo;不仅是拥抱技术，更是保持对世界的好奇。
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="shrink-0 w-1 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      底层逻辑解构
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      无论是优化零售门店的数字闭环，还是分析复杂系统的运作逻辑，本质都是在用
                      AI
                      思维去拆解、重组并解决问题。
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-1 bg-gradient-to-b from-pink-400 to-orange-400 rounded-full" />
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      定义未来
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      AI
                      负责提供效率，而人类负责赋予意义。在算法的海洋里，我们的直觉与同理心是唯一的灯塔。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <p className="text-xs text-muted-foreground text-right">
            Last updated: May 2026
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
