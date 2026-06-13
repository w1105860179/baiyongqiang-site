import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-2xl mx-auto px-6 w-full py-32">
          
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-16">
            About
          </h1>

          <div className="space-y-12">
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
                因此我长期研究
              </h2>
              <div className="space-y-2">
                {['AI', '商业', '投资', '认知成长'].map((topic) => (
                  <span key={topic} className="inline-block text-sm text-muted-foreground/80 mr-6 mb-2">
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground/60">
              并将思考沉淀为长期资产。
            </p>
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
