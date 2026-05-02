'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { User, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function AboutPage() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hi@baiyongqiang.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
              <User size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              BaiYongQiang
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              零售行业数字化解决方案从业者
              <br />
              关注技术、商业与长期价值
            </p>
          </div>

          {/* What I Do */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">我在做什么</h2>
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-muted-foreground leading-relaxed">
                我主要从事零售行业信息化解决方案工作，围绕商超、专卖店、百货及各类零售业态，提供软件系统与智能硬件结合的数字化升级方案。
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                相比传统销售，我更关注方案的整体落地，从业务流程、系统逻辑到实际运营效果，让系统真正服务于经营。
              </p>
            </div>
          </section>

          {/* What I Focus On */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">我关注什么</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  title: '零售行业数字化转型',
                  desc: '深耕零售领域，以信息化驱动行业升级。',
                },
                {
                  title: '人工智能（AI）',
                  desc: '探索 AI 技术在真实场景中的落地应用。',
                },
                {
                  title: '投资与经济',
                  desc: '用长期视角审视市场与价值。',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors"
                >
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">联系我</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              如果您有任何关于零售数字化或 AI 应用的建议，欢迎通过邮件与我联系：
            </p>
            <div className="inline-flex items-center gap-3 rounded-xl border border-border bg-card px-6 py-4">
              <Mail size={18} className="text-primary shrink-0" />
              <span className="text-foreground font-mono text-sm">
                hi@baiyongqiang.com
              </span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 rounded-lg bg-secondary px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-400" />
                    <span className="text-green-400">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>复制</span>
                  </>
                )}
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
