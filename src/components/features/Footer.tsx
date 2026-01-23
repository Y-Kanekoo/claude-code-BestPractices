// フッターコンポーネント

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 text-sm">
          Claude Code ベストプラクティス学習アプリ
        </p>
        <p className="text-center text-gray-400 text-xs mt-2">
          Anthropic公式ドキュメントを基に作成
        </p>
      </div>
    </footer>
  );
}
