import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'BaiYongQiang | 零售数字化专家',
    template: '%s | BaiYongQiang',
  },
  description:
    '零售行业数字化解决方案从业者，关注技术、商业与长期价值。',
  keywords: [
    'BaiYongQiang',
    '零售数字化',
    'AI',
    '投资',
    '零售信息化',
  ],
  authors: [{ name: 'BaiYongQiang' }],
  openGraph: {
    title: 'BaiYongQiang | 零售数字化专家',
    description: '零售行业数字化解决方案从业者，关注技术、商业与长期价值。',
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
