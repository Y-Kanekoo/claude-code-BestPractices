// コードブロックコンポーネント
'use client';

interface CodeBlockProps {
  code: string;
  language?: string;
  description?: string;
}

export function CodeBlock({ code, language = 'bash', description }: CodeBlockProps) {
  return (
    <div className="my-4">
      {description && (
        <p className="text-sm text-gray-600 mb-2">{description}</p>
      )}
      <div className="relative">
        <div className="absolute top-2 right-2 text-xs text-gray-400">
          {language}
        </div>
        <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto text-sm">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
