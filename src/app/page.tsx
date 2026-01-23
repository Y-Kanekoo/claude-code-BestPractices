// トップページ
import { CategoryNav } from '@/components/features/CategoryNav';

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* ヒーローセクション */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Claude Code ベストプラクティス
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Anthropic公式ドキュメントから厳選した23のベストプラクティスで、
          Claude Codeを最大限に活用しましょう。
        </p>
      </section>

      {/* 概要セクション */}
      <section className="mb-12">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            このアプリについて
          </h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600">
              Claude Codeは、AIアシスタントClaudeをコマンドラインから利用できるツールです。
              このアプリでは、Claude Codeを効果的に使うための23のベストプラクティスを
              5つのカテゴリに分けて紹介しています。
            </p>
            <ul className="mt-4 space-y-2 text-gray-600">
              <li>✅ <strong>コアプラクティス</strong>: 基本的な使い方と検証方法</li>
              <li>⚙️ <strong>環境設定</strong>: CLAUDE.md、権限、MCP、Hooksの活用</li>
              <li>💬 <strong>コミュニケーション</strong>: 効果的な質問と要件定義</li>
              <li>📊 <strong>セッション管理</strong>: コンテキスト管理と継続作業</li>
              <li>🚀 <strong>スケーリング</strong>: 自動化と大規模処理</li>
            </ul>
          </div>
        </div>
      </section>

      {/* カテゴリナビゲーション */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          カテゴリから探す
        </h2>
        <CategoryNav />
      </section>
    </div>
  );
}
