// プラクティス一覧ページ
'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { practices, categories, getPracticesByCategory } from '@/lib/practices';
import { PracticeCard } from '@/components/features/PracticeCard';
import Link from 'next/link';

function PracticesList() {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const filteredPractices = selectedCategory
    ? getPracticesByCategory(selectedCategory)
    : practices;

  const currentCategory = categories.find(c => c.id === selectedCategory);

  return (
    <>
      {/* ヘッダー */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentCategory ? currentCategory.nameJa : 'すべてのプラクティス'}
        </h1>
        {currentCategory && (
          <p className="text-gray-600">{currentCategory.description}</p>
        )}
      </div>

      {/* カテゴリフィルター */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/practices"
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          すべて ({practices.length})
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/practices?category=${category.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.nameJa} ({category.practiceIds.length})
          </Link>
        ))}
      </div>

      {/* プラクティス一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPractices.map((practice) => (
          <PracticeCard key={practice.id} practice={practice} />
        ))}
      </div>

      {filteredPractices.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          該当するプラクティスがありません
        </div>
      )}
    </>
  );
}

export default function PracticesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Suspense fallback={<div className="text-center py-12">読み込み中...</div>}>
        <PracticesList />
      </Suspense>
    </div>
  );
}
