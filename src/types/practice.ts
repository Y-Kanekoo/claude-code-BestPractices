// プラクティスの型定義

export type Category =
  | 'core'           // コアプラクティス
  | 'environment'    // 環境設定
  | 'communication'  // コミュニケーション
  | 'session'        // セッション管理
  | 'scaling';       // スケーリング

export interface Example {
  before: string;
  after: string;
  strategy: string;
}

export interface CodeExample {
  language: string;
  code: string;
  description: string;
}

export interface Practice {
  id: number;
  title: string;
  titleJa: string;
  category: Category;
  description: string;
  descriptionJa: string;
  examples?: Example[];
  codeExamples?: CodeExample[];
  tips?: string[];
  relatedIds?: number[];
}

export interface CategoryInfo {
  id: Category;
  name: string;
  nameJa: string;
  description: string;
  practiceIds: number[];
}
