import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function ArroganceAndPrejudicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6">
          {/* Back link */}
          <Link
            href="/thoughts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            返回随笔
          </Link>

          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              傲慢与偏见：面对未知的智慧
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              关于人际交往中无端好恶的思考
            </p>
          </div>

          {/* Article */}
          <article className="space-y-10 text-muted-foreground leading-relaxed">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">生活的现象</h2>
              <p className="mb-4">
                在生活的舞台上，我们每天都穿梭于形形色色的人际交往之中。久而久之，一种有趣却又值得深思的现象浮现眼前：
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4">
                <li>有人对<strong className="text-foreground">中医</strong>不假思索地抵触；</li>
                <li>有人对<strong className="text-foreground">特定明星或品牌产品</strong>本能地反感；</li>
                <li>还有人一提到<strong className="text-foreground">某些国家</strong>就面露厌恶；</li>
                <li>哪怕是年轻人间热议的<strong className="text-foreground">打坐、晒背、站桩</strong>，同样是几家欢喜几家愁。</li>
              </ul>
              <p>
                人各有别，这原本正常，可无端的好恶背后，却藏着值得探究的问题。
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">情绪的"无源之水"</h2>
              <p className="mb-4">
                当我们对未曾了解的人、事、物，轻易滋生喜欢或厌恶的情绪时，其实，<strong className="text-foreground">傲慢与偏见</strong>已悄然登场。
              </p>
              <p className="mb-4">
                以<strong className="text-foreground">打坐</strong>为例：
              </p>
              <div className="border-l-2 border-primary/50 bg-primary/5 pl-4 py-2 my-6 italic text-foreground">
                若从未真正走近它，去知晓其渊源、原理与内涵，又怎会平白无故地产生喜欢或厌恶？
              </div>
              <p>
                这种没来由的情绪，恰似无源之水，皆因我们对其缺乏了解。反之，当我们对某事物进行深度探索，全方位了解后，此时心中所生的喜欢或厌恶，才是基于自身认知的真实态度。
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">面对未知的智慧</h2>
              <p className="mb-4">
                生活常出其不意，当你正专注学习某样东西时，一个不讨喜却又无法回避的事物闯入视野，该如何应对？
              </p>
              <ol className="list-decimal list-inside space-y-3 mb-6">
                <li>
                  <strong className="text-foreground">按下烦躁</strong>：怀揣耐心，尝试靠近它、了解它。
                </li>
                <li>
                  <strong className="text-foreground">延迟评判</strong>：莫急于对抗，更别仓促给它贴上喜欢或讨厌的标签。
                </li>
                <li>
                  <strong className="text-foreground">保持理性</strong>：避免傲慢与偏见成为人际矛盾的导火索。
                </li>
              </ol>
              <p className="mb-4">
                人与人之间犹如不同的星辰，各有其独特的轨迹与光芒。在交往中，遇到不熟悉的事物再正常不过。一旦面对未知，傲慢与偏见就肆意生长，这种负面情绪：
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <strong className="text-foreground">表露于外时</strong>：如脱缰野马，直接激化人际矛盾；
                </li>
                <li>
                  <strong className="text-foreground">藏于心底时</strong>：似隐匿的暗流，让自己陷入郁闷的泥沼。
                </li>
              </ul>
            </section>

            {/* Conclusion */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">结语</h2>
              <div className="border-l-2 border-primary/50 bg-primary/5 pl-4 py-2 my-6 italic text-foreground">
                &ldquo;人是唯一会脸红的动物，或是唯一该脸红的动物。&rdquo; —— 马克&middot;吐温
              </div>
              <p>
                在未知面前，我们应怀揣谦逊，放下傲慢与偏见，用探索的目光、包容的胸怀去拥抱世界的多样。
              </p>
              <p className="mt-4">
                如此，方能在人际交往中搭建起理解的桥梁，在认识世界的旅途中收获更多的智慧与豁达。让我们以<strong className="text-foreground">开放之心</strong>迎接未知，不让傲慢与偏见成为我们与美好世界之间的屏障。
              </p>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
