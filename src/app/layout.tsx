// ルートレイアウト
import type { Metadata } from 'next';
import { Header } from '@/components/features/Header';
import { Footer } from '@/components/features/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Claude Code ベストプラクティス',
  description: 'Claude Codeの23のベストプラクティスをインタラクティブに学習',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
