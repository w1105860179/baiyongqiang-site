import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Brain, TrendingUp, BookOpen, Rocket, Route, GitBranch, ArrowRight, Circle } from 'lucide-react';

// 知识模块定义
const knowledgeAreas = {
  ai: {
    icon: Brain,
    title: 'AI',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    description: '探索 AI 如何改变我们的工作方式、思维方式和未来。',
    topics: [
      { label: '什么是 AI', href: '#' },
      { label: 'AI Agent: 下一代生产力', href: '#' },
      { label: '自动化与工作流', href: '#' },
      { label: '大模型的能力边界', href: '#' },
      { label: 'AI 与个人实践', href: '/ai/my-first-ai-website' },
      { label: 'AI 对行业的影响', href: '/ai/silicon-enlightenment' },
    ],
  },
  invest: {
    icon: TrendingUp,
    title: 'Investing',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    description: '研究商业本质、价值创造与长期复利的投资方法。',
    topics: [
      { label: '价值投资的本质', href: '/invest/wealth-source' },
      { label: 'ROE: 长期回报的核心', href: '#' },
      { label: '护城河: 企业竞争优势', href: '#' },
      { label: '估值: 价格与价值', href: '#' },
      { label: '机会成本', href: '/invest/opportunity-cost' },
      { label: '投资中的心理学', href: '/invest/investment-vs-speculation' },
    ],
  },
  learning: {
    icon: BookOpen,
    title: 'Lifelong Learning',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    description: '持续学习，提升认知能力，构建更好的自己。',
    topics: [
      { label: '学习的方法论', href: '#' },
      { label: '英语: 打开世界的钥匙', href: '#' },
      { label: '数学: 思维的底层结构', href: '#' },
      { label: '认知模型与思维工具', href: '#' },
      { label: '时间管理与专注力', href: '#' },
      { label: '复盘与成长', href: '/thoughts/my-new-article' },
    ],
  },
};

// 推荐阅读路径
const readingPaths = [
  {
    icon: Brain,
    color: 'text-purple-400',
    title: '想了解 AI 如何改变未来?',
    steps: ['什么是 AI', 'AI Agent', '自动化与工作流', 'AI 对行业的影响'],
    link: '/ai',
  },
  {
    icon: TrendingUp,
    color: 'text-amber-400',
    title: '想学习投资的底层逻辑?',
    steps: ['价值投资的本质', 'ROE', '护城河', '估值', '心理学'],
    link: '/invest',
  },
  {
    icon: BookOpen,
    color: 'text-emerald-400',
    title: '想提升认知与能力?',
    steps: ['学习的方法论', '英语', '数学', '认知模型', '复盘与成长'],
    link: '/thoughts',
  },
];

export default function KnowledgeMap() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-6 w-full py-16">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Knowledge Map</h1>
            <p className="text-muted-foreground mb-2">AI × Investing × Lifelong Learning</p>
            <p className="text-sm text-muted-foreground/50">用系统思维理解世界，构建长期复利的认知资产。</p>
          </div>

          {/* Start Here - 阅读顺序引导 */}
          <div className="rounded-xl border border-border/50 bg-card/10 p-6 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Rocket size={18} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Start Here</span>
              <span className="text-xs text-muted-foreground/50">如果你第一次来，建议按这个顺序阅读</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: '1', title: 'AI', desc: '理解技术如何重塑生产力与社会', color: 'bg-purple-500/20 text-purple-400' },
                { num: '2', title: 'Investing', desc: '理解价值如何被创造与分配', color: 'bg-amber-500/20 text-amber-400' },
                { num: '3', title: 'Lifelong Learning', desc: '提升认知能力，实现人生的复利增长', color: 'bg-emerald-500/20 text-emerald-400' },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${item.color}`}>
                    {item.num}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground/60">{item.desc}</div>
                  </div>
                  {i < 2 && <ArrowRight size={16} className="hidden md:block text-muted-foreground/20 mt-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* 三大知识板块 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(knowledgeAreas).map(([key, area]) => {
              const Icon = area.icon;
              return (
                <div key={key} className={`rounded-xl border ${area.borderColor} ${area.bgColor} p-6`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={18} className={area.color} />
                    <h3 className={`text-sm font-medium ${area.color}`}>{area.title}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mb-5 leading-relaxed">
                    {area.description}
                  </p>
                  
                  <div className="space-y-2">
                    {area.topics.map((topic, idx) => (
                      <Link
                        key={topic.label}
                        href={topic.href}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-card/40 transition-colors group"
                      >
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${area.bgColor} ${area.color}`}>
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1">
                          {topic.label}
                        </span>
                        {topic.href !== '#' && (
                          <ArrowRight size={12} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    ))}
                  </div>

                  <Link href={`/${key}`} className={`inline-flex items-center gap-1.5 mt-4 text-xs ${area.color} hover:opacity-80 transition-opacity`}>
                    查看所有文章 <ArrowRight size={12} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* 主题关系图 */}
          <div className="rounded-xl border border-border/50 bg-card/10 p-6 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <GitBranch size={16} className="text-muted-foreground/50" />
              <span className="text-sm font-medium text-foreground">主题关系图</span>
              <span className="text-xs text-muted-foreground/50">知识不是孤立的，而是相互连接的网络。</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              {/* AI Circle */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-purple-500/30 bg-purple-500/5 flex flex-col items-center justify-center">
                  <Brain size={20} className="text-purple-400 mb-1" />
                  <span className="text-xs text-purple-400">AI</span>
                  <span className="text-[10px] text-muted-foreground/50">理解世界变化</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight size={16} className="text-muted-foreground/20 rotate-90 md:rotate-0" />
                <span className="text-[10px] text-muted-foreground/40 mt-1">技术驱动商业模式变化</span>
              </div>

              {/* Investing Circle */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-amber-500/30 bg-amber-500/5 flex flex-col items-center justify-center">
                  <TrendingUp size={20} className="text-amber-400 mb-1" />
                  <span className="text-xs text-amber-400">Investing</span>
                  <span className="text-[10px] text-muted-foreground/50">理解价值分配</span>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <ArrowRight size={16} className="text-muted-foreground/20 rotate-90 md:rotate-0" />
                <span className="text-[10px] text-muted-foreground/40 mt-1">投资需要认知提升</span>
              </div>

              {/* Learning Circle */}
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center">
                  <BookOpen size={20} className="text-emerald-400 mb-1" />
                  <span className="text-xs text-emerald-400">Learning</span>
                  <span className="text-[10px] text-muted-foreground/50">提升认知能力</span>
                </div>
              </div>
            </div>

            {/* 底部回环箭头 */}
            <div className="mt-6 text-center">
              <span className="text-[10px] text-muted-foreground/40">更好的认知帮助更好的投资与决策</span>
            </div>
          </div>

          {/* 推荐阅读路径 */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Route size={16} className="text-muted-foreground/50" />
              <span className="text-sm font-medium text-foreground">推荐阅读路径</span>
              <span className="text-xs text-muted-foreground/50">根据不同目标选择适合你的路径。</span>
            </div>

            <div className="space-y-4">
              {readingPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <div key={path.title} className="rounded-xl border border-border/50 bg-card/10 p-5">
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex items-center gap-3 md:w-64">
                        <Icon size={18} className={path.color} />
                        <span className="text-sm text-foreground">{path.title}</span>
                      </div>
                      
                      <div className="flex-1 flex items-center gap-2 flex-wrap">
                        {path.steps.map((step, idx) => (
                          <div key={step} className="flex items-center">
                            <span className="text-xs text-muted-foreground/60 bg-card/40 px-3 py-1.5 rounded-full">
                              {step}
                            </span>
                            {idx < path.steps.length - 1 && (
                              <ArrowRight size={12} className="text-muted-foreground/20 mx-1" />
                            )}
                          </div>
                        ))}
                      </div>

                      <Link href={path.link} className={`text-xs ${path.color} hover:opacity-80 transition-opacity flex items-center gap-1 whitespace-nowrap`}>
                        开始阅读 <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quote */}
          <div className="text-center pt-8 border-t border-border/30">
            <p className="text-muted-foreground/40 font-serif italic text-sm mb-2">
              &ldquo;我相信，技术、投资与学习这三件事，会在未来产生巨大的复利效应。&rdquo;
            </p>
            <p className="text-xs text-muted-foreground/30">— BaiYongQiang</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
