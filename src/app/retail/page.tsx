import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Store, Monitor, HardDrive } from 'lucide-react';

export default function RetailPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 mb-6">
              <Store size={26} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              零售信息化主营产品
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              围绕商超、专卖店、百货及各类零售业态，提供软件系统与智能硬件结合的数字化升级方案。
            </p>
          </div>

          {/* Software Solutions */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-blue-400">
                <Monitor size={18} />
              </div>
              <h2 className="text-2xl font-bold">软件系统解决方案</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                面向零售全业态的一体化信息系统，涵盖门店管理、商品管理、供应链协同、会员营销等核心业务模块，帮助零售企业实现从采买到销售的全链路数字化闭环。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '门店收银与管理系统',
                  '商品与库存管理系统',
                  '供应链协同平台',
                  '会员营销与数据分析',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Hardware Solutions */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-secondary text-amber-400">
                <HardDrive size={18} />
              </div>
              <h2 className="text-2xl font-bold">硬件设备支持</h2>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <p className="text-muted-foreground leading-relaxed mb-6">
                深度适配零售场景的智能硬件生态，从收银终端到自助设备，从称重仪表到电子价签，软硬件深度整合确保系统稳定运行。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  '智能收银终端',
                  '自助结算设备',
                  '电子称重仪表',
                  '电子价签系统',
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-4 rounded-lg bg-secondary/50 border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                    <span className="text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Philosophy */}
          <section className="rounded-xl border border-primary/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-8">
            <h2 className="text-xl font-bold mb-4">我的理念</h2>
            <p className="text-muted-foreground leading-relaxed">
              相比传统销售，我更关注方案的整体落地——从业务流程、系统逻辑到实际运营效果，让系统真正服务于经营。数字化转型不是简单的系统替换，而是对业务逻辑的深度理解与技术赋能的有机结合。
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
