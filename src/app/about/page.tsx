'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Mail, Copy, Check } from 'lucide-react';

const email = 'hi@baiyongqiang.com';

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 复制失败时静默处理
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-2xl mx-auto px-6 w-full py-24">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-8">
            关于我
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-16">
            我是 BaiYongQiang，一名零售数字化从业者。长期关注 AI、投资与认知成长，
            相信技术、财富与学习是普通人实现人生复利的三条主线。这个网站是我整理思考、
            沉淀知识的地方。
          </p>

          <div className="space-y-14">
            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-6">
                我相信
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>AI 将改变生产力，</p>
                <p>投资决定财富积累，</p>
                <p>学习决定人生上限。</p>
              </div>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-6">
                长期研究
              </h2>
              <div className="flex flex-wrap gap-3">
                {['AI', '商业', '投资', '认知成长'].map((topic) => (
                  <span
                    key={topic}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-border/50 bg-card/30 text-sm text-muted-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-6">
                联系方式
              </h2>
              <p className="text-sm text-muted-foreground/60 mb-4">
                欢迎通过邮件交流想法与合作。
              </p>
              <button
                onClick={handleCopy}
                className="group inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border/50 bg-card/30 text-sm text-foreground hover:bg-card/50 hover:border-border transition-colors"
              >
                <Mail size={16} className="text-muted-foreground" />
                <span>{email}</span>
                {copied ? (
                  <Check size={14} className="text-green-400" />
                ) : (
                  <Copy
                    size={14}
                    className="text-muted-foreground/50 group-hover:text-muted-foreground transition-colors"
                  />
                )}
              </button>
              {copied && (
                <p className="text-xs text-green-400/80 mt-2">邮箱已复制到剪贴板</p>
              )}
            </div>
          </div>

          <div className="mt-20 pt-8 border-t border-border/30">
            <p className="font-serif italic text-white/40 text-sm">
              &ldquo;Think long. Build slow. Stay curious.&rdquo;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
