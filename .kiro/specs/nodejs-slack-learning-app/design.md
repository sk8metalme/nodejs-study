# 設計文書

## 概要

Node.js初学者向けSlack風学習アプリケーションの設計文書。オニオンアーキテクチャを採用し、Next.jsを中心とした現代的なフルスタック開発を段階的に学習できる構成とする。ローカル環境で完結する構成により、外部サービス依存を最小化し、Web開発、API設計、リアルタイム通信、バッチ処理の実践的スキルを習得できる教材として設計する。

## 技術スタック（ローカル環境完結型）

**フロントエンド:**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form
- Zustand (状態管理)

**バックエンド:**
- Next.js API Routes
- Prisma ORM
- PostgreSQL (Docker)
- Redis (Docker)

**リアルタイム通信:**
- Socket.io
- Redis Pub/Sub

**ファイルストレージ:**
- ローカルファイルシステム
- multer (ファイルアップロード)

**バッチ処理:**
- Node.js Cron Jobs
- Bull Queue (Redis)

**認証:**
- NextAuth.js (ローカル認証プロバイダー)

**開発環境:**
- Docker Compose
- ローカル開発サーバー
- ホットリロード対応

## アーキテクチャ

### オニオンアーキテクチャ採用

```mermaid
graph TB
    subgraph "プレゼンテーション層"
        A[Next.js Pages/Components]
        B[API Routes]
        C[Socket.io Handlers]
    end
    
    subgraph "アプリケーション層"
        D[Use Cases]
        E[Application Services]
        F[DTOs]
    end
    
    subgraph "ドメイン層"
        G[Entities]
        H[Value Objects]
        I[Domain Services]
        J[Repository Interfaces]
    end
    
    subgraph "インフラストラクチャ層"
        K[Repository Implementations]
        L[Database Access]
        M[File System]
        N[External Services]
    end
    
    A --> D
    B --> D
    C --> D
    D --> G
    E --> G
    D --> J
    K --> J
    K --> L
    K --> M
```

### ローカル環境完結型システム構成

```mermaid
graph TB
    subgraph "開発環境 (Docker Compose)"
        subgraph "アプリケーション"
            A[Next.js App]
            B[Socket.io Server]
        end
        
        subgraph "データベース"
            C[PostgreSQL]
            D[Redis]
        end
        
        subgraph "ストレージ"
            E[Local File System]
            F[uploads/ directory]
        end
        
        subgraph "バッチ処理"
            G[Node.js Cron Jobs]
            H[Bull Queue]
        end
    end
    
    A --> C
    A --> D
    A --> E
    B --> D
    G --> C
    H --> D
```

### 学習段階別アーキテクチャ

**Phase 1: 基本Web開発**
- Next.js基本構成
- 静的ページとルーティング
- 基本的なReactコンポーネント

**Phase 2: データベース連携**
- Prisma ORM導入
- PostgreSQL接続
- CRUD操作

**Phase 3: 認証システム**
- NextAuth.js実装
- セッション管理
- 認可制御

**Phase 4: リアルタイム機能**
- Socket.io導入
- WebSocket通信
- Redis Pub/Sub

**Phase 5: ファイル処理**
- ファイルアップロード
- 画像処理
- クラウドストレージ

**Phase 6: バッチ処理**
- Cron Jobs
- キューシステム
- 統計処理

## コンポーネントとインターフェース

### オニオンアーキテクチャに基づくプロジェクト構成

```
src/
├── app/                          # プレゼンテーション層 (Next.js)
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── workspace/
│   │   ├── [workspaceId]/
│   │   │   ├── channel/
│   │   │   │   └── [channelId]/
│   │   │   └── settings/
│   │   └── create/
│   ├── api/                      # API Routes (プレゼンテーション層)
│   │   ├── auth/
│   │   ├── workspaces/
│   │   ├── channels/
│   │   ├── messages/
│   │   ├── files/
│   │   └── stats/
│   └── globals.css
├── components/                   # プレゼンテーション層
│   ├── ui/
│   ├── layout/
│   ├── chat/
│   └── workspace/
├── application/                  # アプリケーション層
│   ├── use-cases/
│   │   ├── auth/
│   │   │   ├── LoginUseCase.ts
│   │   │   ├── RegisterUseCase.ts
│   │   │   └── LogoutUseCase.ts
│   │   ├── workspace/
│   │   │   ├── CreateWorkspaceUseCase.ts
│   │   │   ├── JoinWorkspaceUseCase.ts
│   │   │   └── GetWorkspaceUseCase.ts
│   │   ├── channel/
│   │   │   ├── CreateChannelUseCase.ts
│   │   │   └── GetChannelMessagesUseCase.ts
│   │   └── message/
│   │       ├── SendMessageUseCase.ts
│   │       ├── EditMessageUseCase.ts
│   │       └── DeleteMessageUseCase.ts
│   ├── services/
│   │   ├── AuthService.ts
│   │   ├── NotificationService.ts
│   │   └── FileService.ts
│   └── dtos/
│       ├── UserDto.ts
│       ├── WorkspaceDto.ts
│       ├── ChannelDto.ts
│       └── MessageDto.ts
├── domain/                       # ドメイン層
│   ├── entities/
│   │   ├── User.ts
│   │   ├── Workspace.ts
│   │   ├── Channel.ts
│   │   ├── Message.ts
│   │   └── File.ts
│   ├── value-objects/
│   │   ├── Email.ts
│   │   ├── Password.ts
│   │   ├── WorkspaceName.ts
│   │   └── ChannelName.ts
│   ├── services/
│   │   ├── UserDomainService.ts
│   │   ├── WorkspaceDomainService.ts
│   │   └── MessageDomainService.ts
│   └── repositories/             # インターフェース
│       ├── IUserRepository.ts
│       ├── IWorkspaceRepository.ts
│       ├── IChannelRepository.ts
│       ├── IMessageRepository.ts
│       └── IFileRepository.ts
├── infrastructure/               # インフラストラクチャ層
│   ├── repositories/             # 実装
│   │   ├── PrismaUserRepository.ts
│   │   ├── PrismaWorkspaceRepository.ts
│   │   ├── PrismaChannelRepository.ts
│   │   ├── PrismaMessageRepository.ts
│   │   └── LocalFileRepository.ts
│   ├── database/
│   │   ├── prisma.ts
│   │   └── migrations/
│   ├── storage/
│   │   ├── LocalFileStorage.ts
│   │   └── FileUploadHandler.ts
│   ├── cache/
│   │   ├── RedisClient.ts
│   │   └── SessionStore.ts
│   └── external/
│       ├── EmailService.ts
│       └── SocketService.ts
├── shared/                       # 共通
│   ├── types/
│   ├── constants/
│   ├── utils/
│   └── errors/
└── docker/                       # ローカル環境
    ├── docker-compose.yml
    ├── postgres/
    ├── redis/
    └── uploads/
```

### APIエンドポイント設計

**認証関連**
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン
- `POST /api/auth/logout` - ログアウト

**ワークスペース管理**
- `GET /api/workspaces` - ワークスペース一覧
- `POST /api/workspaces` - ワークスペース作成
- `GET /api/workspaces/[id]` - ワークスペース詳細
- `PUT /api/workspaces/[id]` - ワークスペース更新
- `POST /api/workspaces/[id]/invite` - メンバー招待

**チャンネル管理**
- `GET /api/workspaces/[id]/channels` - チャンネル一覧
- `POST /api/workspaces/[id]/channels` - チャンネル作成
- `GET /api/channels/[id]` - チャンネル詳細
- `PUT /api/channels/[id]` - チャンネル更新

**メッセージ管理**
- `GET /api/channels/[id]/messages` - メッセージ一覧
- `POST /api/channels/[id]/messages` - メッセージ投稿
- `PUT /api/messages/[id]` - メッセージ編集
- `DELETE /api/messages/[id]` - メッセージ削除

**ファイル管理**
- `POST /api/files/upload` - ファイルアップロード
- `GET /api/files/[id]` - ファイル取得
- `DELETE /api/files/[id]` - ファイル削除

**統計・検索**
- `GET /api/search` - メッセージ検索
- `GET /api/stats/workspace/[id]` - ワークスペース統計
- `GET /api/stats/user/[id]` - ユーザー統計

## データモデル

### Prismaスキーマ設計

```prisma
model User {
  id          String   @id @default(cuid())
  email       String   @unique
  name        String
  avatar      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  workspaces  WorkspaceMember[]
  messages    Message[]
  files       File[]
}

model Workspace {
  id          String   @id @default(cuid())
  name        String
  description String?
  avatar      String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  members     WorkspaceMember[]
  channels    Channel[]
}

model WorkspaceMember {
  id          String   @id @default(cuid())
  role        Role     @default(MEMBER)
  joinedAt    DateTime @default(now())
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  
  @@unique([userId, workspaceId])
}

model Channel {
  id          String   @id @default(cuid())
  name        String
  description String?
  isPrivate   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  workspaceId String
  workspace   Workspace @relation(fields: [workspaceId], references: [id])
  messages    Message[]
}

model Message {
  id          String   @id @default(cuid())
  content     String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  channelId   String
  channel     Channel  @relation(fields: [channelId], references: [id])
  files       File[]
}

model File {
  id          String   @id @default(cuid())
  filename    String
  originalName String
  mimeType    String
  size        Int
  url         String
  createdAt   DateTime @default(now())
  
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  messageId   String?
  message     Message? @relation(fields: [messageId], references: [id])
}

enum Role {
  ADMIN
  MEMBER
}
```

### Redis データ構造

**セッション管理**
```
session:{sessionId} -> {userId, workspaceId, expiresAt}
```

**リアルタイム通信**
```
workspace:{workspaceId}:online -> Set<userId>
channel:{channelId}:typing -> Set<userId>
```

**キューシステム**
```
queue:stats -> [{type, workspaceId, data}]
queue:notifications -> [{userId, type, data}]
```

## エラーハンドリング

### APIエラーレスポンス形式

```typescript
interface ApiError {
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  path: string;
}
```

### エラー分類

**認証エラー (401)**
- `AUTH_REQUIRED` - 認証が必要
- `INVALID_CREDENTIALS` - 認証情報が無効
- `SESSION_EXPIRED` - セッション期限切れ

**認可エラー (403)**
- `INSUFFICIENT_PERMISSIONS` - 権限不足
- `WORKSPACE_ACCESS_DENIED` - ワークスペースアクセス拒否

**バリデーションエラー (400)**
- `INVALID_INPUT` - 入力値が無効
- `MISSING_REQUIRED_FIELD` - 必須フィールド不足

**リソースエラー (404)**
- `RESOURCE_NOT_FOUND` - リソースが見つからない
- `WORKSPACE_NOT_FOUND` - ワークスペースが見つからない

**サーバーエラー (500)**
- `INTERNAL_SERVER_ERROR` - 内部サーバーエラー
- `DATABASE_ERROR` - データベースエラー

### フロントエンドエラーハンドリング

```typescript
// エラーバウンダリー
class ErrorBoundary extends React.Component {
  // エラー状態管理とフォールバックUI
}

// APIエラーハンドリング
const handleApiError = (error: ApiError) => {
  switch (error.error.code) {
    case 'AUTH_REQUIRED':
      router.push('/login');
      break;
    case 'INSUFFICIENT_PERMISSIONS':
      toast.error('権限がありません');
      break;
    default:
      toast.error('エラーが発生しました');
  }
};
```

## テスト戦略

### テスト構成

**単体テスト**
- React コンポーネント (Jest + React Testing Library)
- API ルート (Jest + Supertest)
- ユーティリティ関数 (Jest)

**統合テスト**
- API エンドポイント間の連携
- データベース操作
- 認証フロー

**E2Eテスト**
- Playwright を使用
- 主要ユーザーフロー
- リアルタイム機能

### テスト環境

```typescript
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// テストデータベース
DATABASE_URL="postgresql://test:test@localhost:5432/slack_test"
REDIS_URL="redis://localhost:6379/1"
```

### 学習段階別テスト

**Phase 1: 基本テスト**
- コンポーネントレンダリング
- ルーティング

**Phase 2: データベーステスト**
- CRUD操作
- データ整合性

**Phase 3: 認証テスト**
- ログイン/ログアウト
- セッション管理

**Phase 4: リアルタイムテスト**
- WebSocket接続
- メッセージ配信

**Phase 5: ファイルテスト**
- アップロード/ダウンロード
- ファイル処理

**Phase 6: バッチテスト**
- 統計処理
- キュー処理

## 学習教材としての特徴

### MVP重視の段階的学習アプローチ

#### コア学習パス（MVP）
1. **基礎フェーズ**: Next.js基本、React、TypeScript、オニオンアーキテクチャ基盤
2. **ドメイン層フェーズ**: エンティティ、バリューオブジェクト、ビジネスルール
3. **データベースフェーズ**: Prisma、PostgreSQL、リポジトリパターン
4. **認証フェーズ**: NextAuth.js、セッション管理、ユースケース実装
5. **基本チャット機能**: メッセージ送受信、チャンネル管理
6. **MVP完成**: 基本的なSlack機能の動作確認

#### 拡張学習パス（包括版）
7. **リアルタイム機能**: Socket.io、WebSocket、Redis Pub/Sub
8. **ファイル処理**: アップロード、ストレージ、画像処理
9. **バッチ処理**: Cron、キュー、統計機能
10. **高度な機能**: 検索、通知、パフォーマンス最適化

### オニオンアーキテクチャ学習効果

#### 各層の学習目標

**ドメイン層（中心）**
- ビジネスロジックの純粋性
- エンティティとバリューオブジェクトの設計
- ドメインサービスによる複雑なビジネスルール
- 外部依存からの独立性

**アプリケーション層**
- ユースケース駆動設計の実践
- DTOによるデータ変換
- アプリケーションサービスの責務
- 依存関係の注入

**インフラストラクチャ層**
- 技術的実装の詳細
- リポジトリパターンの実装
- 外部サービスとの連携
- データベースアクセス層

**プレゼンテーション層**
- UI/UXとビジネスロジックの分離
- APIエンドポイントの設計
- フロントエンドコンポーネント設計

#### 依存関係逆転の実践学習

```typescript
// 学習ポイント1: インターフェース定義（ドメイン層）
export interface IMessageRepository {
  save(message: Message): Promise<void>;
  findByChannelId(channelId: string): Promise<Message[]>;
}

// 学習ポイント2: ユースケース実装（アプリケーション層）
export class SendMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private notificationService: INotificationService
  ) {}
  
  async execute(command: SendMessageCommand): Promise<void> {
    // ビジネスロジックに集中
    const message = Message.create(command);
    await this.messageRepository.save(message);
    await this.notificationService.notify(message);
  }
}

// 学習ポイント3: 具体実装（インフラストラクチャ層）
export class PrismaMessageRepository implements IMessageRepository {
  async save(message: Message): Promise<void> {
    // Prisma固有の実装
  }
}
```

### 学習サポート機能

#### MVP重視の学習ガイド
- **段階別チェックリスト**: 各フェーズの完了基準
- **動作確認ポイント**: 各段階での機能テスト方法
- **MVP判定基準**: 最小限の機能要件の明確化
- **拡張判断ガイド**: 次のフェーズに進むべきかの判断基準

#### オニオンアーキテクチャ学習ガイド
- **層別責務マップ**: 各層の責務と境界の明確化
- **依存関係図**: 依存の方向と理由の説明
- **リファクタリング演習**: 悪い設計から良い設計への変換例
- **アンチパターン集**: よくある設計ミスとその修正方法

#### 実践的学習リソース
- **コード例とベストプラクティス**: 各層の実装例
- **トラブルシューティングガイド**: よくある問題と解決方法
- **演習問題と解答例**: 理解度確認のための課題
- **デプロイメントガイド**: 本番環境への展開方法

### 実践的スキル習得

#### コア技術スキル（MVP）
- Next.js 14とApp Routerの活用
- TypeScriptによる型安全な開発
- Prisma ORMとデータベース設計
- オニオンアーキテクチャの実装
- 基本的なAPI設計

#### 拡張技術スキル（包括版）
- リアルタイム通信（Socket.io）
- ファイル処理とストレージ
- バッチ処理とキューシステム
- テスト駆動開発
- パフォーマンス最適化
- セキュリティベストプラクティス

#### ソフトスキル
- 要件の優先順位付け
- MVP思考による開発プロセス
- アーキテクチャ設計の意思決定
- コードレビューとリファクタリング
- 技術的負債の管理
## オニ
オンアーキテクチャの学習効果

### 依存関係の逆転原則

```typescript
// ドメイン層 - インターフェース定義
export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}

// アプリケーション層 - ユースケース
export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}
  
  async execute(email: string, password: string): Promise<LoginResult> {
    // ビジネスロジック
    const user = await this.userRepository.findByEmail(email);
    // ...
  }
}

// インフラストラクチャ層 - 実装
export class PrismaUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    // Prisma実装
  }
}
```

### レイヤー分離による学習効果

1. **ドメイン層**: ビジネスロジックの理解
2. **アプリケーション層**: ユースケース駆動設計
3. **インフラストラクチャ層**: 技術的実装の分離
4. **プレゼンテーション層**: UI/UXとビジネスロジックの分離

## ローカル環境構成

### Docker Compose設定

```yaml
# docker-compose.yml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: slack_learning
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/slack_learning
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis
    volumes:
      - ./uploads:/app/uploads

volumes:
  postgres_data:
  redis_data:
```

### 環境変数設定

```env
# .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/slack_learning"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
UPLOAD_DIR="./uploads"
```

## 学習パス選択システム

### MVP重視パス vs 包括学習パス

#### MVP重視パス（推奨初学者向け）
**目標**: 最短で動作するSlackアプリを完成させる

**含まれる機能**:
- ユーザー認証（ログイン・登録）
- ワークスペース作成・参加
- チャンネル作成・管理
- 基本的なメッセージ送受信
- シンプルなUI/UX

**学習期間**: 2-3週間
**完了基準**: 基本的なチャット機能が動作すること

#### 包括学習パス（経験者・深く学びたい方向け）
**目標**: 本格的なSlackクローンと高度な技術スキルの習得

**追加機能**:
- リアルタイム通信
- ファイルアップロード・共有
- 検索機能
- 統計・分析機能
- バッチ処理
- 包括的なテスト
- パフォーマンス最適化

**学習期間**: 6-8週間
**完了基準**: 全機能が実装され、テストが通ること

### 学習進捗管理

#### 段階別チェックポイント

```typescript
interface LearningCheckpoint {
  phase: string;
  coreRequirements: string[];
  optionalRequirements: string[];
  completionCriteria: string[];
  nextStepGuidance: string;
}

const learningPath: LearningCheckpoint[] = [
  {
    phase: "Phase 1: 基盤構築",
    coreRequirements: [
      "Next.jsプロジェクト初期化",
      "オニオンアーキテクチャ構造作成",
      "Docker環境構築"
    ],
    optionalRequirements: [
      "テスト環境設定",
      "CI/CD設定"
    ],
    completionCriteria: [
      "開発サーバーが起動すること",
      "データベース接続が確認できること"
    ],
    nextStepGuidance: "ドメイン層の実装に進む"
  },
  // 他のフェーズも同様に定義
];
```

#### 学習者向けダッシュボード

```typescript
interface LearningProgress {
  currentPhase: number;
  completedTasks: string[];
  optionalTasksCompleted: string[];
  estimatedTimeRemaining: string;
  recommendedNextAction: string;
  learningPath: 'mvp' | 'comprehensive';
}
```

### 柔軟な学習設計

#### 途中での学習パス変更
- MVP完了後に包括パスへの移行可能
- 各フェーズでの一時停止・再開対応
- 個別機能のスキップ・後回し対応

#### 個別学習ニーズ対応
- 特定技術（例：Socket.io）のみの学習
- 特定層（例：ドメイン層）の深掘り学習
- 実装パターンの比較学習（例：Repository vs Active Record）

#### 学習成果の可視化
- 実装した機能の一覧表示
- 習得した技術スキルのマップ
- コード品質メトリクス
- アーキテクチャ理解度チェック