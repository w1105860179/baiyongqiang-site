import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BaiYongQiang | AI × Investing × Lifelong Learning',
    template: '%s | BaiYongQiang',
  },
  description:
    'Think long. Build slow. Stay curious. — AI × Investing × Lifelong Learning 的个人知识系统。',
  keywords: ['BaiYongQiang', 'AI', '投资', 'Investing', 'Lifelong Learning', '个人知识系统'],
  authors: [{ name: 'BaiYongQiang' }],
  openGraph: {
    title: 'BaiYongQiang | AI × Investing × Lifelong Learning',
    description: 'Think long. Build slow. Stay curious. — AI × Investing × Lifelong Learning 的个人知识系统。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN" className="dark">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
