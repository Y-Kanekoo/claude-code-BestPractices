// ヘッダーコンポーネント
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">
              Claude Code ベストプラクティス
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link
              href="/practices"
              className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
            >
              プラクティス一覧
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
