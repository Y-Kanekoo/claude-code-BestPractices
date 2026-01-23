// 23のベストプラクティスデータ
import { Practice, CategoryInfo } from '@/types/practice';

export const categories: CategoryInfo[] = [
  {
    id: 'core',
    name: 'Core Practices',
    nameJa: 'コアプラクティス',
    description: '作業検証、計画から実装、具体的なプロンプト、リッチコンテンツの活用',
    practiceIds: [1, 2, 3, 4],
  },
  {
    id: 'environment',
    name: 'Environment Setup',
    nameJa: '環境設定',
    description: 'CLAUDE.md、権限設定、CLI、MCP、Hooks、Skills、Subagents、Plugins',
    practiceIds: [5, 6, 7, 8, 9, 10, 11, 12],
  },
  {
    id: 'communication',
    name: 'Communication',
    nameJa: 'コミュニケーション',
    description: 'コードベースへの質問、インタビュー形式での要件定義',
    practiceIds: [13, 14],
  },
  {
    id: 'session',
    name: 'Session Management',
    nameJa: 'セッション管理',
    description: '早期修正、コンテキスト管理、サブエージェント、チェックポイント、再開',
    practiceIds: [15, 16, 17, 18, 19],
  },
  {
    id: 'scaling',
    name: 'Scaling',
    nameJa: 'スケーリング',
    description: 'ヘッドレスモード、複数セッション、ファンアウト、自律モード',
    practiceIds: [20, 21, 22, 23],
  },
];

export const practices: Practice[] = [
  // コアプラクティス (1-4)
  {
    id: 1,
    title: 'Verify Work with Tests and Type Checks',
    titleJa: 'テストと型チェックで作業を検証する',
    category: 'core',
    description: 'Give Claude the ability to verify its own work by providing commands to run tests and type checks.',
    descriptionJa: 'Claudeがテストや型チェックを実行するコマンドを提供し、自身の作業を検証できるようにします。フィードバックループを与えることで、問題を自己修正できます。',
    examples: [
      {
        before: 'Update the user authentication flow',
        after: 'Update the user authentication flow. Run `npm test` to verify changes.',
        strategy: 'テストコマンドを含める',
      },
    ],
    codeExamples: [
      {
        language: 'markdown',
        code: `# CLAUDE.md
## 検証コマンド
- テスト: \`npm test\`
- 型チェック: \`npm run typecheck\`
- リント: \`npm run lint\``,
        description: 'CLAUDE.mdに検証コマンドを記載',
      },
    ],
    tips: [
      'テスト、型チェック、リントのコマンドをCLAUDE.mdに記載する',
      'Claudeは失敗したテストを見てコードを修正できる',
      'MCP（Model Context Protocol）でブラウザ自動化ツールを接続すると視覚的な検証も可能',
    ],
    relatedIds: [5, 8],
  },
  {
    id: 2,
    title: 'Plan First, Then Implement',
    titleJa: '計画してから実装する',
    category: 'core',
    description: 'For complex tasks, ask Claude to create a plan before implementing. Use extended thinking for additional reasoning power.',
    descriptionJa: '複雑なタスクでは、実装前にClaudeに計画を作成させます。拡張思考を使うと、より深い推論が可能になります。',
    examples: [
      {
        before: 'Implement a caching system',
        after: 'Create a plan for implementing a caching system. After I approve, implement it.',
        strategy: '明示的に計画フェーズを要求',
      },
    ],
    codeExamples: [
      {
        language: 'bash',
        code: `# 拡張思考を有効化
claude --thinking-budget 10000

# または「think」という言葉を使う
"think step by step about how to refactor this module"`,
        description: '拡張思考の有効化方法',
      },
    ],
    tips: [
      '「think harder」「think a lot」などの表現で思考の深さを調整可能',
      '計画を承認してから実装させることで、方向性のずれを防げる',
      '複雑なタスクほど計画フェーズが重要',
    ],
    relatedIds: [14, 17],
  },
  {
    id: 3,
    title: 'Be Specific in Your Prompts',
    titleJa: 'プロンプトを具体的にする',
    category: 'core',
    description: 'When results aren\'t what you expected, add more context and specificity to your prompts.',
    descriptionJa: '期待通りの結果が得られない場合は、プロンプトにより多くのコンテキストと具体性を追加します。',
    examples: [
      {
        before: 'Add tests',
        after: 'Add unit tests for the authentication module using Jest. Mock external API calls and test error handling.',
        strategy: 'テスト対象、フレームワーク、モック要件を明示',
      },
      {
        before: 'Refactor this',
        after: 'Refactor this function to use async/await instead of callbacks. Maintain the same public API.',
        strategy: 'リファクタ方針と制約を明示',
      },
      {
        before: 'Make it faster',
        after: 'Optimize this database query to reduce response time. Add indexing if needed and use eager loading for relationships.',
        strategy: '最適化手法を具体的に指示',
      },
    ],
    tips: [
      '曖昧な指示は曖昧な結果を生む',
      'ファイル名、関数名、技術スタックを明示する',
      '制約条件（互換性維持など）も伝える',
    ],
    relatedIds: [5, 14],
  },
  {
    id: 4,
    title: 'Use Rich Content: Images, Diagrams, URLs',
    titleJa: 'リッチコンテンツを活用する：画像、図、URL',
    category: 'core',
    description: 'Claude can process images, diagrams, and URLs. Use them to provide better context.',
    descriptionJa: 'Claudeは画像、図、URLを処理できます。これらを使ってより良いコンテキストを提供しましょう。',
    codeExamples: [
      {
        language: 'bash',
        code: `# 画像をドラッグ＆ドロップで追加
# または
claude "Implement this design" --image mockup.png

# URLを直接参照
claude "Fix the issue described here: https://github.com/..."`,
        description: '画像やURLの活用方法',
      },
    ],
    tips: [
      'UIモックアップ画像を渡すとそのデザインを実装できる',
      'エラーのスクリーンショットを渡すとデバッグに役立つ',
      'GitHubのIssueやPR URLを直接参照可能',
      '図やアーキテクチャ図も理解できる',
    ],
    relatedIds: [3, 5],
  },

  // 環境設定 (5-12)
  {
    id: 5,
    title: 'Use CLAUDE.md to Give Claude Context',
    titleJa: 'CLAUDE.mdでClaudeにコンテキストを与える',
    category: 'environment',
    description: 'Create a CLAUDE.md file in your project root to provide project-specific context that Claude loads automatically.',
    descriptionJa: 'プロジェクトルートにCLAUDE.mdファイルを作成し、Claudeが自動的に読み込むプロジェクト固有のコンテキストを提供します。',
    codeExamples: [
      {
        language: 'markdown',
        code: `# CLAUDE.md

## プロジェクト概要
このプロジェクトはNext.js製のEコマースサイトです。

## 技術スタック
- Next.js 14 (App Router)
- TypeScript
- Prisma + PostgreSQL

## コマンド
- \`npm run dev\` - 開発サーバー起動
- \`npm test\` - テスト実行
- \`npm run typecheck\` - 型チェック

## コーディング規約
- コメントは日本語
- 関数名・変数名は英語
- any禁止`,
        description: 'CLAUDE.mdの例',
      },
    ],
    tips: [
      'CLAUDE.mdはプロジェクトルート、親ディレクトリ、~/.claude/CLAUDE.mdに配置可能',
      '頻繁に使うコマンドをリスト化しておく',
      'プロジェクト固有のルールや制約を記載',
      '複数のCLAUDE.mdがある場合、すべてマージされる',
    ],
    relatedIds: [1, 3, 6],
  },
  {
    id: 6,
    title: 'Set Up Permissions Wisely',
    titleJa: '権限を賢く設定する',
    category: 'environment',
    description: 'Balance safety and convenience by configuring Claude\'s permission settings appropriately.',
    descriptionJa: 'Claudeの権限設定を適切に構成し、安全性と利便性のバランスを取ります。',
    codeExamples: [
      {
        language: 'bash',
        code: `# 許可リストにコマンドを追加
claude config add allowedTools "Bash(npm test)"
claude config add allowedTools "Bash(npm run lint)"

# 危険なコマンドはデフォルトで確認を求める
# git push, rm -rf などは手動承認が必要`,
        description: '権限設定の例',
      },
    ],
    tips: [
      'よく使う安全なコマンドは許可リストに追加',
      '破壊的なコマンドは許可リストに入れない',
      'チームで権限設定を共有する場合は.claude/settings.jsonを使う',
      '--dangerously-skip-permissionsは本当に必要な場合のみ',
    ],
    relatedIds: [5, 7],
  },
  {
    id: 7,
    title: 'Use Claude in Your IDE and Terminal',
    titleJa: 'IDEとターミナルでClaudeを使う',
    category: 'environment',
    description: 'Claude Code works in terminal and integrates with VS Code and JetBrains IDEs.',
    descriptionJa: 'Claude CodeはターミナルとVS Code、JetBrains IDEで動作します。作業スタイルに合わせて使い分けましょう。',
    codeExamples: [
      {
        language: 'bash',
        code: `# ターミナルで起動
claude

# VS Code拡張機能
# マーケットプレイスから「Claude Code」をインストール

# パイプ入力
cat error.log | claude "何が問題？"

# ファイル指定
claude -f src/components/Auth.tsx "このコンポーネントをリファクタして"`,
        description: '様々な起動方法',
      },
    ],
    tips: [
      'ターミナルでは会話履歴がスクロールで確認しやすい',
      'IDEでは該当コードを見ながら作業できる',
      'パイプ入力でログ分析などが効率的',
      'VimキーバインドでClaude内をナビゲート可能',
    ],
    relatedIds: [6, 8],
  },
  {
    id: 8,
    title: 'Extend Claude with MCP',
    titleJa: 'MCPでClaudeを拡張する',
    category: 'environment',
    description: 'Model Context Protocol (MCP) lets you connect Claude to external tools like databases, APIs, and browser automation.',
    descriptionJa: 'Model Context Protocol（MCP）を使うと、Claudeをデータベース、API、ブラウザ自動化などの外部ツールに接続できます。',
    codeExamples: [
      {
        language: 'json',
        code: `// ~/.claude/settings.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "postgresql://..."
      }
    },
    "puppeteer": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-puppeteer"]
    }
  }
}`,
        description: 'MCP設定の例',
      },
    ],
    tips: [
      'Puppeteerでブラウザ操作、視覚的な検証が可能',
      'PostgreSQLサーバーでDB操作を直接実行',
      'Sentryサーバーでエラー監視を統合',
      'カスタムMCPサーバーも作成可能',
    ],
    relatedIds: [1, 9],
  },
  {
    id: 9,
    title: 'Use Hooks for Workflow Automation',
    titleJa: 'Hooksでワークフローを自動化する',
    category: 'environment',
    description: 'Hooks let you run custom scripts before or after Claude\'s actions.',
    descriptionJa: 'Hooksを使うと、Claudeのアクションの前後にカスタムスクリプトを実行できます。',
    codeExamples: [
      {
        language: 'json',
        code: `// .claude/settings.json
{
  "hooks": {
    "postToolUse": [
      {
        "tool": "Write",
        "command": "npm run lint --fix \\"$FILE\\""
      }
    ],
    "preCommit": [
      {
        "command": "npm test"
      }
    ]
  }
}`,
        description: 'Hooks設定の例',
      },
    ],
    tips: [
      'ファイル保存後に自動フォーマット',
      'コミット前にテスト実行',
      'ビルド後に自動デプロイ',
      '通知（Slack、メールなど）の送信',
    ],
    relatedIds: [6, 8],
  },
  {
    id: 10,
    title: 'Create Custom Skills',
    titleJa: 'カスタムスキルを作成する',
    category: 'environment',
    description: 'Define reusable custom slash commands for common workflows.',
    descriptionJa: '一般的なワークフロー用に再利用可能なカスタムスラッシュコマンドを定義します。',
    codeExamples: [
      {
        language: 'markdown',
        code: `<!-- ~/.claude/skills/review.md -->
# コードレビュースキル

以下の観点でコードをレビューしてください：
1. バグや潜在的な問題
2. パフォーマンス
3. セキュリティ
4. 可読性とメンテナンス性

問題があれば具体的な修正案を提示してください。`,
        description: 'カスタムスキルの例',
      },
      {
        language: 'bash',
        code: `# 使用方法
claude /review src/components/Auth.tsx`,
        description: 'スキルの呼び出し',
      },
    ],
    tips: [
      '~/.claude/skills/ディレクトリにMarkdownファイルを配置',
      'ファイル名がスラッシュコマンド名になる',
      'チーム共通のスキルはプロジェクトの.claude/skills/に配置',
    ],
    relatedIds: [5, 11],
  },
  {
    id: 11,
    title: 'Use Subagents for Parallel Work',
    titleJa: 'サブエージェントで並列作業する',
    category: 'environment',
    description: 'Claude can spawn subagents to work on tasks in parallel.',
    descriptionJa: 'Claudeはサブエージェントを生成して、タスクを並列で実行できます。',
    codeExamples: [
      {
        language: 'text',
        code: `# プロンプト例
"このプロジェクトのすべてのコンポーネントに対して、
それぞれ並列でユニットテストを作成してください"

# Claudeは自動的に複数のサブエージェントを起動し、
# 各コンポーネントのテストを並行して作成`,
        description: 'サブエージェントの活用例',
      },
    ],
    tips: [
      '大量のファイル処理を高速化',
      '独立したタスクを同時実行',
      'サブエージェントの結果は自動的に統合される',
      'リソース消費に注意',
    ],
    relatedIds: [17, 22],
  },
  {
    id: 12,
    title: 'Explore Third-party Plugins',
    titleJa: 'サードパーティプラグインを活用する',
    category: 'environment',
    description: 'Enhance Claude with community-created plugins and tools.',
    descriptionJa: 'コミュニティが作成したプラグインやツールでClaudeを強化します。',
    tips: [
      'Anthropic公式のMCPサーバーリストを確認',
      'GitHubで「claude code plugin」「mcp server」を検索',
      'セキュリティに注意してサードパーティツールを使用',
      '自分でプラグインを作成してコミュニティに貢献も可能',
    ],
    relatedIds: [8, 10],
  },

  // コミュニケーション (13-14)
  {
    id: 13,
    title: 'Ask Claude Questions About Your Codebase',
    titleJa: 'コードベースについてClaudeに質問する',
    category: 'communication',
    description: 'Use Claude to explore and understand your codebase by asking questions.',
    descriptionJa: 'Claudeに質問することで、コードベースを探索し理解を深めます。',
    codeExamples: [
      {
        language: 'text',
        code: `# 質問例
"認証フローはどのように実装されている？"
"このAPIエンドポイントはどこで定義されている？"
"ユーザーデータのバリデーションはどこで行われている？"
"このエラーが発生する原因は何？"`,
        description: 'コードベースへの質問例',
      },
    ],
    tips: [
      'ドキュメントがないレガシーコードの理解に最適',
      'バグの原因調査に活用',
      '新しいチームメンバーのオンボーディングに',
      'アーキテクチャの全体像を把握',
    ],
    relatedIds: [3, 14],
  },
  {
    id: 14,
    title: 'Have Claude Interview You',
    titleJa: 'Claudeにインタビューしてもらう',
    category: 'communication',
    description: 'Ask Claude to interview you about requirements before starting work.',
    descriptionJa: '作業を始める前に、Claudeに要件についてインタビューしてもらいます。',
    codeExamples: [
      {
        language: 'text',
        code: `# プロンプト例
"新しい通知システムを実装したい。
実装を始める前に、要件を明確にするために
いくつか質問してもらえますか？"

# Claudeの質問例：
# - どのような通知チャネル（メール、プッシュ、SMS）が必要ですか？
# - 通知の優先度レベルは必要ですか？
# - ユーザーは通知設定をカスタマイズできますか？
# - リアルタイム通知は必要ですか？`,
        description: 'インタビュー形式での要件定義',
      },
    ],
    tips: [
      '曖昧な要件を明確化できる',
      '見落としていた観点を発見できる',
      '実装前に方針を固められる',
      'ドキュメント作成にも活用可能',
    ],
    relatedIds: [2, 3],
  },

  // セッション管理 (15-19)
  {
    id: 15,
    title: 'Correct Course Early',
    titleJa: '早期に軌道修正する',
    category: 'session',
    description: 'If Claude goes in the wrong direction, interrupt and redirect immediately.',
    descriptionJa: 'Claudeが間違った方向に進んでいる場合は、すぐに中断して軌道修正します。',
    codeExamples: [
      {
        language: 'text',
        code: `# Ctrl+C または Escape で中断

# 軌道修正のプロンプト例
"その方向ではなく、既存の認証システムを使って実装してください"
"Reactではなく、Vueで実装してください"
"テストは後で良いので、まず機能を実装してください"`,
        description: '軌道修正の方法',
      },
    ],
    tips: [
      '間違った方向に進んでいると感じたらすぐに止める',
      '時間とトークンの無駄を防げる',
      '具体的に何が違うのかを伝える',
      '承認を待つ設定にしておくのも有効',
    ],
    relatedIds: [2, 6],
  },
  {
    id: 16,
    title: 'Manage Context for Long Sessions',
    titleJa: '長いセッションでコンテキストを管理する',
    category: 'session',
    description: 'Use /compact or summarization to manage context window in long sessions.',
    descriptionJa: '長いセッションでは、/compactや要約を使ってコンテキストウィンドウを管理します。',
    codeExamples: [
      {
        language: 'bash',
        code: `# コンテキストを圧縮
/compact

# 新しいトピックに移る前に
/clear

# 現在のセッションを要約
/summary`,
        description: 'コンテキスト管理コマンド',
      },
    ],
    tips: [
      'コンテキストが大きくなるとレスポンスが遅くなる',
      '/compactで不要な情報を削除',
      '新しいタスクには新しいセッションを検討',
      'CLAUDE.mdに重要な情報を書いておけば常に参照される',
    ],
    relatedIds: [5, 18, 19],
  },
  {
    id: 17,
    title: 'Let Claude Spawn Subagents',
    titleJa: 'Claudeにサブエージェントを生成させる',
    category: 'session',
    description: 'For complex, independent tasks, allow Claude to use subagents.',
    descriptionJa: '複雑で独立したタスクには、Claudeにサブエージェントを使わせます。',
    codeExamples: [
      {
        language: 'text',
        code: `# 複数の独立したタスクを依頼
"以下のモジュールそれぞれにユニットテストを追加してください：
- src/auth/
- src/api/
- src/utils/
並列で作業してOKです"`,
        description: 'サブエージェント活用の指示',
      },
    ],
    tips: [
      '独立したタスクを高速に処理',
      'Claudeが自動的に作業を分割',
      '結果は統合されて報告される',
      'コストとリソース消費に注意',
    ],
    relatedIds: [11, 22],
  },
  {
    id: 18,
    title: 'Use Checkpoints to Save Progress',
    titleJa: 'チェックポイントで進捗を保存する',
    category: 'session',
    description: 'Commit frequently to create checkpoints you can return to.',
    descriptionJa: '頻繁にコミットしてチェックポイントを作成し、いつでも戻れるようにします。',
    codeExamples: [
      {
        language: 'bash',
        code: `# 作業の節目でコミット
git add .
git commit -m "feat: 認証の基本実装完了（チェックポイント）"

# 問題が発生したら戻る
git reset --hard HEAD~1`,
        description: 'Gitをチェックポイントとして活用',
      },
    ],
    tips: [
      '大きな変更の前にコミット',
      'Claudeに「ここでコミットして」と指示可能',
      '問題が発生してもすぐに戻れる',
      'ブランチを活用した実験も有効',
    ],
    relatedIds: [15, 19],
  },
  {
    id: 19,
    title: 'Resume Previous Sessions',
    titleJa: '以前のセッションを再開する',
    category: 'session',
    description: 'Use --resume to continue from a previous session with full context.',
    descriptionJa: '--resumeを使って、完全なコンテキストを持った以前のセッションから続けます。',
    codeExamples: [
      {
        language: 'bash',
        code: `# 最後のセッションを再開
claude --resume

# 特定のセッションを再開
claude --resume session_abc123

# セッション一覧を確認
claude sessions list`,
        description: 'セッション再開の方法',
      },
    ],
    tips: [
      '中断した作業を翌日続けられる',
      'コンテキストが保持されるので説明不要',
      'セッションIDで特定のセッションを指定可能',
      '長期プロジェクトでの継続作業に最適',
    ],
    relatedIds: [16, 18],
  },

  // スケーリング (20-23)
  {
    id: 20,
    title: 'Use Headless Mode for Automation',
    titleJa: 'ヘッドレスモードで自動化する',
    category: 'scaling',
    description: 'Run Claude in headless mode (--print) for CI/CD and automation scripts.',
    descriptionJa: 'CI/CDや自動化スクリプト用に、ヘッドレスモード（--print）でClaudeを実行します。',
    codeExamples: [
      {
        language: 'bash',
        code: `# ヘッドレスモードで実行
claude --print "このPRの変更をレビューして" | tee review.md

# パイプで入力
git diff HEAD~1 | claude --print "この差分をレビューして"

# CI/CDパイプラインでの使用
claude --print --allowedTools "Bash(npm test)" "テストを実行して結果を報告"`,
        description: 'ヘッドレスモードの活用例',
      },
    ],
    tips: [
      'CI/CDでのコードレビュー自動化',
      'スクリプトからの呼び出し',
      '出力をファイルにリダイレクト可能',
      '対話なしで実行される',
    ],
    relatedIds: [21, 23],
  },
  {
    id: 21,
    title: 'Run Multiple Claude Sessions',
    titleJa: '複数のClaudeセッションを実行する',
    category: 'scaling',
    description: 'Run multiple Claude sessions for independent workstreams.',
    descriptionJa: '独立した作業ストリーム用に、複数のClaudeセッションを実行します。',
    codeExamples: [
      {
        language: 'bash',
        code: `# ターミナル1: フロントエンド作業
cd frontend && claude

# ターミナル2: バックエンド作業
cd backend && claude

# ターミナル3: インフラ作業
cd infrastructure && claude`,
        description: '複数セッションの活用',
      },
    ],
    tips: [
      '異なるワークストリームを並行して進められる',
      'フロントとバックを同時に開発',
      'セッション間でのコンフリクトに注意',
      'Gitでの統合を意識して作業',
    ],
    relatedIds: [11, 22],
  },
  {
    id: 22,
    title: 'Use Fan-out for Large-scale Changes',
    titleJa: 'ファンアウトで大規模変更を行う',
    category: 'scaling',
    description: 'Use Claude\'s fan-out capability for large-scale codebase changes.',
    descriptionJa: 'Claudeのファンアウト機能を使って、大規模なコードベースの変更を行います。',
    codeExamples: [
      {
        language: 'text',
        code: `# プロンプト例
"プロジェクト全体で使われている古いログライブラリを
新しいものに置き換えてください。各モジュールごとに
並列で作業して構いません。"

# Claudeは自動的に：
# 1. 影響範囲を分析
# 2. モジュールごとにサブエージェントを起動
# 3. 並列で変更を実施
# 4. 結果を統合`,
        description: 'ファンアウトの活用例',
      },
    ],
    tips: [
      '大規模リファクタリングに最適',
      '依存関係の更新に活用',
      'コードスタイルの統一にも',
      '変更後のテスト実行も指示する',
    ],
    relatedIds: [11, 17, 21],
  },
  {
    id: 23,
    title: 'Enable Autonomous Mode Carefully',
    titleJa: '自律モードを慎重に有効化する',
    category: 'scaling',
    description: 'Use autonomous mode for trusted, well-defined tasks. Always have safeguards.',
    descriptionJa: '信頼できる、明確に定義されたタスクには自律モードを使用します。常にセーフガードを設けてください。',
    codeExamples: [
      {
        language: 'bash',
        code: `# 自律モード（確認なしで実行）
claude --auto-accept "テストを実行して失敗を修正"

# 特定のツールのみ自動承認
claude --allowedTools "Bash(npm test)" --allowedTools "Edit" \\
  "テストが通るまでコードを修正"

# 時間制限付き
timeout 30m claude --auto-accept "バグを修正"`,
        description: '自律モードの使用例',
      },
    ],
    tips: [
      '明確に定義されたタスクにのみ使用',
      '破壊的なコマンドは許可リストに入れない',
      '時間制限やリソース制限を設ける',
      'Gitコミットで常にロールバック可能に',
      'CI/CD環境では特に慎重に',
    ],
    relatedIds: [6, 18, 20],
  },
];

export function getPracticeById(id: number): Practice | undefined {
  return practices.find(p => p.id === id);
}

export function getPracticesByCategory(category: string): Practice[] {
  return practices.filter(p => p.category === category);
}

export function getCategoryById(id: string): CategoryInfo | undefined {
  return categories.find(c => c.id === id);
}
