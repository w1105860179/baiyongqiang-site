import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <div className="max-w-3xl mx-auto px-6 w-full py-20">
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            About
          </h1>
          <p className="text-muted-foreground/60 font-serif italic mb-16">
            Think long. Build slow. Stay curious.
          </p>

          <div className="space-y-12 text-sm text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">Who I am</h2>
              <p>
                四线城市生活，零售数字化从业者。从技术岗做到销售岗，踩过不少坑，也攒了一些想法。
              </p>
              <p className="mt-3">
                公众号<span className="text-foreground/70">「深海湖说」</span>主理人，围绕投资、认知、AI 持续写作。
              </p>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">What I believe</h2>
              <ul className="space-y-3">
                <li><span className="text-foreground/70">AI</span> — is reshaping how we work and think. I explore it, not hype it.</li>
                <li><span className="text-foreground/70">Investing</span> — isn&apos;t just about money. Health, relationships, cognition all compound.</li>
                <li><span className="text-foreground/70">Lifelong Learning</span> — is the only sustainable edge. Write to think, build to learn.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">This site</h2>
              <p>
                这里是我的公开笔记本。文章、思考、还有自己搭的小工具。不是博客，是一个正在生长的知识系统。
              </p>
            </div>

            <div>
              <h2 className="text-xs font-medium text-muted-foreground/50 uppercase tracking-[0.2em] mb-4">Contact</h2>
              <div className="rounded-xl border border-border bg-card/30 p-5 inline-block">
                <span className="text-foreground/70 font-mono text-sm">hi@baiyongqiang.com</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('hi@baiyongqiang.com');
                    const el = document.getElementById('copy-btn');
                    if (el) { el.textContent = 'Copied'; setTimeout(() => { el.textContent = 'Copy'; }, 1500); }
                  }}
                  id="copy-btn"
                  className="ml-3 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
