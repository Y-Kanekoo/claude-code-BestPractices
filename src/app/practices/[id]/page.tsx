// プラクティス詳細ページ
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { practices, getPracticeById, getCategoryById } from '@/lib/practices';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { CodeBlock } from '@/components/ui/CodeBlock';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return practices.map((practice) => ({
    id: practice.id.toString(),
  }));
}

export default async function PracticeDetailPage({ params }: PageProps) {
  const { id } = await params;
  const practice = getPracticeById(parseInt(id, 10));

  if (!practice) {
    notFound();
  }

  const category = getCategoryById(practice.category);
  const relatedPractices = practice.relatedIds
    ?.map(id => getPracticeById(id))
    .filter(Boolean);

  // 前後のプラクティス
  const prevPractice = getPracticeById(practice.id - 1);
  const nextPractice = getPracticeById(practice.id + 1);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* パンくずリスト */}
      <nav className="mb-6 text-sm">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              ホーム
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/practices" className="text-gray-500 hover:text-gray-700">
              プラクティス
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link
              href={`/practices?category=${practice.category}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {category?.nameJa}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 font-medium">#{practice.id}</li>
        </ol>
      </nav>

      {/* ヘッダー */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-400">#{practice.id}</span>
          <Badge category={practice.category} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {practice.titleJa}
        </h1>
        <p className="text-lg text-gray-500">
          {practice.title}
        </p>
      </header>

      {/* 説明 */}
      <Card className="mb-8">
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {practice.descriptionJa}
          </p>
        </CardContent>
      </Card>

      {/* Before/After 例 */}
      {practice.examples && practice.examples.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Before / After
          </h2>
          <div className="space-y-4">
            {practice.examples.map((example, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-red-600 mb-2">
                        ❌ Before
                      </h4>
                      <div className="bg-red-50 rounded-lg p-3 text-sm text-gray-700">
                        {example.before}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-green-600 mb-2">
                        ✅ After
                      </h4>
                      <div className="bg-green-50 rounded-lg p-3 text-sm text-gray-700">
                        {example.after}
                      </div>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-gray-500">
                    💡 {example.strategy}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* コード例 */}
      {practice.codeExamples && practice.codeExamples.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            コード例
          </h2>
          {practice.codeExamples.map((example, index) => (
            <CodeBlock
              key={index}
              code={example.code}
              language={example.language}
              description={example.description}
            />
          ))}
        </section>
      )}

      {/* Tips */}
      {practice.tips && practice.tips.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tips
          </h2>
          <Card>
            <CardContent>
              <ul className="space-y-2">
                {practice.tips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      )}

      {/* 関連プラクティス */}
      {relatedPractices && relatedPractices.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            関連プラクティス
          </h2>
          <div className="flex flex-wrap gap-2">
            {relatedPractices.map((related) => (
              related && (
                <Link
                  key={related.id}
                  href={`/practices/${related.id}`}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="text-gray-500 mr-2">#{related.id}</span>
                  <span className="text-gray-900">{related.titleJa}</span>
                </Link>
              )
            ))}
          </div>
        </section>
      )}

      {/* ページナビゲーション */}
      <nav className="flex justify-between pt-8 border-t border-gray-200">
        {prevPractice ? (
          <Link
            href={`/practices/${prevPractice.id}`}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <span className="mr-2">←</span>
            <div>
              <div className="text-sm text-gray-400">前へ</div>
              <div className="font-medium">#{prevPractice.id} {prevPractice.titleJa}</div>
            </div>
          </Link>
        ) : (
          <div />
        )}
        {nextPractice ? (
          <Link
            href={`/practices/${nextPractice.id}`}
            className="flex items-center text-right text-gray-600 hover:text-gray-900"
          >
            <div>
              <div className="text-sm text-gray-400">次へ</div>
              <div className="font-medium">#{nextPractice.id} {nextPractice.titleJa}</div>
            </div>
            <span className="ml-2">→</span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
