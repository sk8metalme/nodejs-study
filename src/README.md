# オニオンアーキテクチャ構造

このプロジェクトはオニオンアーキテクチャ（Onion Architecture）を採用しています。

## ディレクトリ構造

```
src/
├── app/                          # プレゼンテーション層 (Next.js App Router)
│   ├── (auth)/                   # 認証関連ページ
│   ├── workspace/                # ワークスペース関連ページ
│   ├── api/                      # API Routes
│   └── globals.css               # グローバルスタイル
│
├── domain/                       # ドメイン層（中心）
│   ├── entities/                 # エンティティ
│   │   ├── User.ts
│   │   ├── Workspace.ts
│   │   ├── Channel.ts
│   │   ├── Message.ts
│   │   └── File.ts
│   └── repositories/             # リポジトリインターフェース
│       ├── IUserRepository.ts
│       ├── IWorkspaceRepository.ts
│       ├── IChannelRepository.ts
│       ├── IMessageRepository.ts
│       └── IFileRepository.ts
│
├── application/                  # アプリケーション層
│   ├── use-cases/                # ユースケース
│   ├── services/                 # アプリケーションサービス
│   └── dtos/                     # データ転送オブジェクト
│       ├── UserDto.ts
│       ├── WorkspaceDto.ts
│       ├── ChannelDto.ts
│       ├── MessageDto.ts
│       └── FileDto.ts
│
├── infrastructure/               # インフラストラクチャ層
│   ├── database/                 # データベース接続
│   │   └── prisma.ts
│   ├── repositories/             # リポジトリ実装
│   ├── storage/                  # ファイルストレージ
│   └── cache/                    # キャッシュ（Redis）
│
└── shared/                       # 共通
    ├── types/                    # 共通型定義
    ├── constants/                # 定数
    └── utils/                    # ユーティリティ関数
```

## 各層の責務

### ドメイン層（Domain Layer）
- **責務**: ビジネスロジックの中心
- **含まれるもの**: エンティティ、バリューオブジェクト、ドメインサービス、リポジトリインターフェース
- **依存関係**: 他の層に依存しない（最も内側）

### アプリケーション層（Application Layer）
- **責務**: ユースケースの実装、アプリケーションロジック
- **含まれるもの**: ユースケース、アプリケーションサービス、DTO
- **依存関係**: ドメイン層のみに依存

### インフラストラクチャ層（Infrastructure Layer）
- **責務**: 技術的な実装の詳細
- **含まれるもの**: データベースアクセス、外部API連携、ファイルシステム
- **依存関係**: ドメイン層とアプリケーション層に依存

### プレゼンテーション層（Presentation Layer）
- **責務**: ユーザーインターフェース、API エンドポイント
- **含まれるもの**: Next.js ページ、コンポーネント、API Routes
- **依存関係**: アプリケーション層に依存

## 依存関係の方向

```
プレゼンテーション層
        ↓
アプリケーション層
        ↓
   ドメイン層 ← インフラストラクチャ層
```

依存関係は常に内側（ドメイン層）に向かいます。これにより、ビジネスロジックが技術的な実装の詳細から独立します。

## 依存関係の逆転原則（DIP）

インフラストラクチャ層はドメイン層で定義されたインターフェースを実装します：

```typescript
// ドメイン層: インターフェース定義
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

// インフラストラクチャ層: 実装
export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // Prisma を使った実装
  }
}

// アプリケーション層: インターフェースに依存
export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}
}
```

## 学習のポイント

1. **ドメイン層から始める**: ビジネスロジックを最初に定義
2. **インターフェースを活用**: 依存関係の逆転を実現
3. **レイヤーの境界を守る**: 各層の責務を明確に分離
4. **テスタビリティ**: インターフェースによりモックが容易

## 次のステップ

1. Prisma スキーマの定義
2. リポジトリの実装
3. ユースケースの実装
4. API エンドポイントの作成
