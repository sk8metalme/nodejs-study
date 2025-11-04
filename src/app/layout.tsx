import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Slack Learning App',
  description: 'Node.js学習用Slackクローンアプリケーション',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
