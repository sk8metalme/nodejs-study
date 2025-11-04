# 開発ガイド

## 🏗️ プロジェクト構造

```
slack-learning-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # 認証ページグループ
│   │   ├── workspace/         # ワークスペース関連
│   │   ├── api/               # API Routes
│   │   └── globals.css        # グローバルスタイル
│   │
│   ├── domain/                 # ドメイン層
│   │   ├── entities/          # エンティティ
│   │   └── repositories/      # リポジトリインターフェース
│   │
│   ├── application/            # アプリケーション層
│   │   ├── use-cases/         # ユースケース
│   │   ├── services/          # アプリケーションサービス
│   │   └── dtos/              # データ転送オブジェクト
│   │
│   ├── infrastructure/         # インフラストラクチャ層
│   │   ├── database/          # データベース接続
│   │   ├── repositories/      # リポジトリ実装
│   │   ├── storage/           # ファイルストレージ
│   │   └── cache/             # キャッシュ（Redis）
│   │
│   └── shared/                 # 共通
│       ├── types/             # 型定義
│       ├── constants/         # 定数
│       └── utils/             # ユーティリティ
│
├── prisma/
│   └── schema.prisma          # データベーススキーマ
│
├── scripts/                    # セットアップスクリプト
├── docker-compose.yml         # Docker 設定
└── package.json               # 依存関係
```

## 🎯 開発フロー

### 1. 新機能の開発

#### ステップ1: ドメイン層から始める

```typescript
// src/domain/entities/NewEntity.ts
export class NewEntity {
  // ビジネスロジックを実装
}

// src/domain/repositories/INewRepository.ts
export interface INewRepository {
  // リポジトリインターフェースを定義
}
```

#### ステップ2: アプリケーション層の実装

```typescript
// src/application/use-cases/NewUseCase.ts
export class NewUseCase {
  constructor(private repository: INewRepository) {}
  
  async execute(input: InputDto): Promise<OutputDto> {
    // ユースケースを実装
  }
}
```

#### ステップ3: インフラストラクチャ層の実装

```typescript
// src/infrastructure/repositories/PrismaNewRepository.ts
export class PrismaNewRepository implements INewRepository {
  // Prisma を使った実装
}
```

#### ステップ4: プレゼンテーション層の実装

```typescript
// src/app/api/new/route.ts
export async function POST(request: Request) {
  // API エンドポイントを実装
}
```

### 2. データベーススキーマの変更

```bash
# 1. schema.prisma を編集
vim prisma/schema.prisma

# 2. マイグレーションを作成
npm run db:migrate

# 3. Prisma クライアントを再生成
npm run db:generate
```

### 3. コードの品質チェック

```bash
# 型チェック
npm run type-check

# リンター
npm run lint

# フォーマット
npm run format
```

## 🧪 テスト（今後実装予定）

```bash
# 単体テスト
npm test

# E2Eテスト
npm run test:e2e

# カバレッジ
npm run test:coverage
```

## 📝 コーディング規約

### TypeScript

- **厳密な型付け**: `any` の使用を避ける
- **明示的な戻り値の型**: 関数の戻り値の型を明示
- **インターフェースの活用**: 依存関係の逆転を実現

```typescript
// Good
async function getUser(id: string): Promise<User | null> {
  return await userRepository.findById(id);
}

// Bad
async function getUser(id: any) {
  return await userRepository.findById(id);
}
```

### ファイル命名規則

- **エンティティ**: PascalCase (例: `User.ts`, `Workspace.ts`)
- **リポジトリ**: `I` プレフィックス + PascalCase (例: `IUserRepository.ts`)
- **実装**: PascalCase (例: `PrismaUserRepository.ts`)
- **ユースケース**: PascalCase + `UseCase` サフィックス (例: `LoginUseCase.ts`)
- **DTO**: PascalCase + `Dto` サフィックス (例: `UserDto.ts`)

### ディレクトリ構造

- **index.ts**: barrel exports を使用して再エクスポート
- **1ファイル1クラス/インターフェース**: 可読性を向上

## 🔄 Git ワークフロー

### ブランチ戦略

```bash
main              # 本番環境
  └── develop     # 開発環境
       └── feature/xxx  # 機能開発
       └── fix/xxx      # バグ修正
```

### コミットメッセージ

```
feat: 新機能の追加
fix: バグ修正
docs: ドキュメントの更新
style: コードフォーマット
refactor: リファクタリング
test: テストの追加・修正
chore: ビルドプロセスやツールの変更
```

例:
```bash
git commit -m "feat: ユーザー認証機能を追加"
git commit -m "fix: メッセージ送信時のエラーを修正"
```

## 🐛 デバッグ

### Next.js のデバッグ

```bash
# デバッグモードで起動
NODE_OPTIONS='--inspect' npm run dev
```

Chrome DevTools で `chrome://inspect` を開く

### Prisma のデバッグ

```typescript
// src/infrastructure/database/prisma.ts
export const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'], // クエリログを有効化
});
```

### Redis のデバッグ

```bash
# Redis CLI に接続
npm run docker:logs redis

# または
docker-compose exec redis redis-cli
> MONITOR  # すべてのコマンドを監視
```

## 📊 パフォーマンス最適化

### データベースクエリの最適化

```typescript
// Bad: N+1 問題
const users = await prisma.user.findMany();
for (const user of users) {
  const messages = await prisma.message.findMany({
    where: { userId: user.id }
  });
}

// Good: include を使用
const users = await prisma.user.findMany({
  include: {
    messages: true
  }
});
```

### キャッシュの活用

```typescript
// Redis を使ったキャッシュ
const cached = await redis.get(`user:${id}`);
if (cached) return JSON.parse(cached);

const user = await userRepository.findById(id);
await redis.set(`user:${id}`, JSON.stringify(user), 'EX', 3600);
```

## 🔐 セキュリティ

### 環境変数の管理

- `.env.local` は Git にコミットしない
- 本番環境では環境変数を適切に設定
- シークレットキーは定期的にローテーション

### 入力バリデーション

```typescript
import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const result = userSchema.safeParse(input);
if (!result.success) {
  throw new ValidationError('Invalid input', result.error);
}
```

## 📚 参考リソース

### 公式ドキュメント

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### アーキテクチャ

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Onion Architecture](https://jeffreypalermo.com/2008/07/the-onion-architecture-part-1/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

## 🤝 コントリビューション

1. Issue を作成して議論
2. Feature ブランチを作成
3. コードを実装
4. テストを追加
5. Pull Request を作成

## 💡 ヒント

- **小さく始める**: MVP を意識して最小限の機能から実装
- **テストを書く**: 後から追加するのは大変
- **ドキュメントを更新**: コードと同時にドキュメントも更新
- **レビューを依頼**: 他の開発者からフィードバックをもらう
