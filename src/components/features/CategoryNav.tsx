// カテゴリナビゲーションコンポーネント
import Link from 'next/link';
import { categories } from '@/lib/practices';

export function CategoryNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/practices?category=${category.id}`}
          className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {category.nameJa}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {category.description}
          </p>
          <span className="text-sm text-blue-600">
            {category.practiceIds.length}件のプラクティス →
          </span>
        </Link>
      ))}
    </div>
  );
}
