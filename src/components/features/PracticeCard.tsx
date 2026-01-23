// プラクティスカードコンポーネント
import Link from 'next/link';
import { Practice } from '@/types/practice';
import { Badge } from '@/components/ui/Badge';

interface PracticeCardProps {
  practice: Practice;
}

export function PracticeCard({ practice }: PracticeCardProps) {
  return (
    <Link
      href={`/practices/${practice.id}`}
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-sm font-medium text-gray-500">
          #{practice.id}
        </span>
        <Badge category={practice.category} />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {practice.titleJa}
      </h3>
      <p className="text-sm text-gray-500 mb-2">
        {practice.title}
      </p>
      <p className="text-sm text-gray-600 line-clamp-2">
        {practice.descriptionJa}
      </p>
    </Link>
  );
}
