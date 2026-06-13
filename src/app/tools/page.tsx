import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Calculator, TrendingUp, BookOpen } from 'lucide-react';

const tools = [
  {
    icon: Calculator,
    title: '复利计算器',
    description: '输入本金、年化收益率和投资年限，看看复利的效果。',
    status: '搭建中',
  },
  {
    icon: TrendingUp,
    title: '定投回测',
    description: '选择一个标的，回测定投的历史收益。',
    status: '搭建中',
  },
  {
    icon: BookOpen,
    title: '阅读笔记',
    description: '最近在读的书和笔记摘要。',
    status: '搭建中',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            工具
          </h1>
          <p className="text-muted-foreground mb-16">
            一些自己会用到的小工具，随手搭在这里。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tools.map((tool) => (
              <div
                key={tool.title}
                className="rounded-xl border border-border bg-card/50 p-6 transition-colors hover:border-border/80"
              >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary mb-4 text-muted-foreground">
                  <tool.icon size={18} />
                </div>
                <h3 className="text-sm font-medium text-foreground mb-2">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted-foreground/60 leading-relaxed mb-3">
                  {tool.description}
                </p>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500/70 border border-amber-500/20">
                  {tool.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-xl border border-border/50 bg-card/20 text-center">
            <p className="text-sm text-muted-foreground/60">
              有想用的小工具？欢迎
              <a
                href="mailto:hi@baiyongqiang.com"
                className="text-muted-foreground hover:text-foreground underline underline-offset-4 mx-1"
              >
                邮件告诉我
              </a>
              。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
