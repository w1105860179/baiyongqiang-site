'use client';

import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Brain, TrendingUp, BookOpen, Rocket, Route, GitBranch, ArrowRight } from 'lucide-react';

// 实际文章（只展示已有内容）
const areas = {
  ai: {
    icon: Brain,
    title: 'AI',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/30',
    bgColor: 'bg-purple-500/5',
    description: '探索 AI 如何改变工作、学习和生活。',
    topics: [
      { label: '硅基启蒙：AI 时代的全球重构', href: '/ai/silicon-enlightenment' },
      { label: '也算亲手用了AI', href: '/ai/my-first-ai-website' },
    ],
  },
  invest: {
    icon: TrendingUp,
    title: 'Investing',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    bgColor: 'bg-amber-500/5',
    description: '长期视角看待价值、风险与复利增长。',
    topics: [
      { label: '那你是怎么稀释机会成本的呢？', href: '/invest/opportunity-cost' },
      { label: '为什么是泡泡玛特', href: '/invest/why-popmart' },
      { label: '说下投资和投机', href: '/invest/investment-vs-speculation' },
      { label: '沉没成本：为什么我们总是舍不得放手', href: '/invest/sunk-cost' },
      { label: '财富的源头与本质', href: '/invest/wealth-source' },
    ],
  },
  learning: {
    icon: BookOpen,
    title: 'Learning',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/30',
    bgColor: 'bg-emerald-500/5',
    description: '认知、决策与个人成长的笔记与思考。',
    topics: [
      { label: '怎么能成长的最快？', href: '/thoughts/multi-dimensional-growth' },
      { label: '复杂并不等于高级', href: '/thoughts/complexity-vs-simplicity' },
      { label: '丢人就像丢钱一样', href: '/thoughts/fear-of-embarrassment' },
      { label: '曾经坚持，但现在改变的观点', href: '/thoughts/changed-perspectives' },
      { label: '傲慢与偏见：面对未知的智慧', href: '/thoughts/arrogance-and-prejudice' },
      { label: '开启微行动，成就大改变', href: '/thoughts/my-new-article' },
    ],
  },
};

export default function KnowledgeMap() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-5xl mx-auto px-6 w-full py-16">
          
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">Knowledge Map</h1>
            <p className="text-muted-foreground">AI × Investing × Lifelong Learning</p>
            <p className="text-sm text-muted-foreground/50 mt-2">用系统思维理解世界，构建长期复利的认知资产。</p>
          </div>

          {/* Start Here */}
          <div className="rounded-xl border border-border/50 bg-card/10 p-6 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Rocket size={18} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Start Here</span>
              <span className="text-xs text-muted-foreground/50">第一次来？建议按这个顺序阅读</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { num: '1', title: 'AI', desc: '理解技术如何重塑生产力', color: 'bg-purple-500/20 text-purple-400' },
                { num: '2', title: 'Investing', desc: '理解价值如何被创造与分配', color: 'bg-amber-500/20 text-amber-400' },
                { num: '3', title: 'Lifelong Learning', desc: '提升认知，实现人生的复利增长', color: 'bg-emerald-500/20 text-emerald-400' },
              ].map((item, i) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${item.color}`}>{item.num}</span>
                  <div>
                    <div className="text-sm font-medium text-foreground">{item.title}</div>
                    <div className="text-xs text-muted-foreground/60">{item.desc}</div>
                  </div>
                  {i < 2 && <ArrowRight size={16} className="hidden md:block text-muted-foreground/20 mt-1" />}
                </div>
              ))}
            </div>
          </div>

          {/* 三大板块 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Object.entries(areas).map(([key, area]) => {
              const Icon = area.icon;
              return (
                <div key={key} className={`rounded-xl border ${area.borderColor} ${area.bgColor} p-6`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={18} className={area.color} />
                    <h3 className={`text-sm font-medium ${area.color}`}>{area.title}</h3>
                    <span className="text-[10px] text-muted-foreground/50 ml-auto">{area.topics.length} 篇</span>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mb-5 leading-relaxed">{area.description}</p>
                  
                  <div className="space-y-1.5">
                    {area.topics.map((topic, idx) => (
                      <Link
                        key={topic.label}
                        href={topic.href}
                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-card/40 transition-colors group"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] text-muted-foreground/50 border border-border/50">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors flex-1 truncate">
                          {topic.label}
                        </span>
                        <ArrowRight size={12} className="text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 主题关系图 */}
          <div className="rounded-xl border border-border/50 bg-card/10 p-6 mb-12">
            <div className="flex items-center gap-2 mb-8">
              <GitBranch size={16} className="text-muted-foreground/50" />
              <span className="text-sm font-medium text-foreground">主题关系图</span>
              <span className="text-xs text-muted-foreground/50">知识不是孤立的，而是相互连接的网络。</span>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6">
              <div className="w-20 h-20 rounded-full border-2 border-purple-500/30 bg-purple-500/5 flex flex-col items-center justify-center">
                <Brain size={16} className="text-purple-400 mb-0.5" />
                <span className="text-[10px] text-purple-400">AI</span>
              </div>
              <ArrowRight size={14} className="text-muted-foreground/20 rotate-90 md:rotate-0" />
              <div className="w-20 h-20 rounded-full border-2 border-amber-500/30 bg-amber-500/5 flex flex-col items-center justify-center">
                <TrendingUp size={16} className="text-amber-400 mb-0.5" />
                <span className="text-[10px] text-amber-400">Investing</span>
              </div>
              <ArrowRight size={14} className="text-muted-foreground/20 rotate-90 md:rotate-0" />
              <div className="w-20 h-20 rounded-full border-2 border-emerald-500/30 bg-emerald-500/5 flex flex-col items-center justify-center">
                <BookOpen size={16} className="text-emerald-400 mb-0.5" />
                <span className="text-[10px] text-emerald-400">Learning</span>
              </div>
            </div>
            <div className="mt-5 text-center">
              <span className="text-[10px] text-muted-foreground/40">技术 → 投资 → 认知，三者互相强化。</span>
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
              {[
                {
                  icon: TrendingUp,
                  color: 'text-amber-400',
                  title: '想学投资的底层逻辑',
                  articles: [
                    { label: '说下投资和投机', href: '/invest/investment-vs-speculation' },
                    { label: '那你是怎么稀释机会成本的呢？', href: '/invest/opportunity-cost' },
                    { label: '沉没成本', href: '/invest/sunk-cost' },
                    { label: '为什么是泡泡玛特', href: '/invest/why-popmart' },
                    { label: '财富的源头与本质', href: '/invest/wealth-source' },
                  ],
                  link: '/invest',
                },
                {
                  icon: BookOpen,
                  color: 'text-emerald-400',
                  title: '想提升个人认知',
                  articles: [
                    { label: '开启微行动，成就大改变', href: '/thoughts/my-new-article' },
                    { label: '怎么能成长的最快？', href: '/thoughts/multi-dimensional-growth' },
                    { label: '丢人就像丢钱一样', href: '/thoughts/fear-of-embarrassment' },
                    { label: '复杂并不等于高级', href: '/thoughts/complexity-vs-simplicity' },
                    { label: '傲慢与偏见：面对未知的智慧', href: '/thoughts/arrogance-and-prejudice' },
                  ],
                  link: '/thoughts',
                },
                {
                  icon: Brain,
                  color: 'text-purple-400',
                  title: '想了解 AI 与实践',
                  articles: [
                    { label: '也算亲手用了AI', href: '/ai/my-first-ai-website' },
                    { label: '硅基启蒙：AI 时代的全球重构', href: '/ai/silicon-enlightenment' },
                  ],
                  link: '/ai',
                },
              ].map((path) => {
                const Icon = path.icon;
                return (
                  <div key={path.title} className="rounded-xl border border-border/50 bg-card/10 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon size={16} className={path.color} />
                      <span className="text-sm font-medium text-foreground">{path.title}</span>
                      <Link href={path.link} className={`text-[10px] ${path.color} hover:opacity-80 transition-opacity ml-auto flex items-center gap-1`}>
                        全部 <ArrowRight size={10} />
                      </Link>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {path.articles.map((a, idx) => (
                        <Link
                          key={a.href}
                          href={a.href}
                          className="text-xs text-muted-foreground hover:text-foreground bg-card/40 px-3 py-1 rounded-full transition-colors"
                        >
                          {a.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center pt-8 border-t border-border/30">
            <p className="text-muted-foreground/40 font-serif italic text-sm mb-2">
              &ldquo;技术、投资与学习，会产生巨大的复利效应。&rdquo;
            </p>
            <p className="text-xs text-muted-foreground/30">— BaiYongQiang</p>
            <p className="text-xs text-muted-foreground/20 mt-3">共 {Object.values(areas).reduce((s, a) => s + a.topics.length, 0)} 篇文章，持续更新中。</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
