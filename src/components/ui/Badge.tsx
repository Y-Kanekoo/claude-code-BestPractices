// バッジコンポーネント
import { Category } from '@/types/practice';

interface BadgeProps {
  category: Category;
}

const categoryStyles: Record<Category, { bg: string; text: string; label: string }> = {
  core: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    label: 'コア',
  },
  environment: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    label: '環境設定',
  },
  communication: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    label: 'コミュニケーション',
  },
  session: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    label: 'セッション管理',
  },
  scaling: {
    bg: 'bg-red-100',
    text: 'text-red-800',
    label: 'スケーリング',
  },
};

export function Badge({ category }: BadgeProps) {
  const style = categoryStyles[category];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
