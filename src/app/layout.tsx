import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BaiYongQiang | AI × 投资 × 终身学习',
    template: '%s | BaiYongQiang',
  },
  description:
    'Think long. Build slow. Stay curious. — AI × 投资 × 终身学习的个人知识系统。',
  keywords: ['BaiYongQiang', 'AI', '投资', '终身学习', '个人知识系统'],
  authors: [{ name: 'BaiYongQiang' }],
  openGraph: {
    title: 'BaiYongQiang | AI × 投资 × 终身学习',
    description: 'Think long. Build slow. Stay curious. — AI × 投资 × 终身学习的个人知识系统。',
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
