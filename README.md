# Slack Learning App

Node.js初学者向けのハンズオン学習教材として開発された、Slackを模倣したWebアプリケーションです。

## 🎯 プロジェクトの目的

このプロジェクトは、Next.jsとオニオンアーキテクチャを使用して、実践的なNode.js開発スキルを習得することを目的としています。

### 学習できる技術

- **フロントエンド**: Next.js 14 (App Router), React, TypeScript, Tailwind CSS
- **バックエンド**: Next.js API Routes, Prisma ORM, PostgreSQL
- **リアルタイム通信**: Socket.io, Redis Pub/Sub
- **アーキテクチャ**: オニオンアーキテクチャ、依存関係の逆転原則
- **開発環境**: Docker, Docker Compose

## 🏗️ アーキテクチャ

このプロジェクトは**オニオンアーキテクチャ**を採用しています：

```
プレゼンテーション層 (Next.js Pages/API)
        ↓
アプリケーション層 (Use Cases)
        ↓
   ドメイン層 (Entities) ← インフラストラクチャ層 (Repositories)
```

詳細は [src/README.md](src/README.md) を参照してください。

## 🚀 セットアップ

### 前提条件

- Node.js 18以上
- Docker & Docker Compose
- npm または yarn

### クイックスタート

1. **リポジトリのクローン**

```bash
git clone <repository-url>
cd nodejs-study
```

2. **自動セットアップスクリプトの実行**

```bash
./scripts/setup.sh
```

このスクリプトは以下を自動的に実行します：
- Docker コンテナの起動（PostgreSQL, Redis）
- 依存関係のインストール
- Prisma クライアントの生成
- データベースマイグレーション

3. **開発サーバーの起動**

```bash
npm run dev
```

アプリケーションは http://localhost:3000 で起動します。

### 手動セットアップ

自動スクリプトを使用しない場合：

```bash
# 1. Docker コンテナの起動
docker-compose up -d

# 2. 依存関係のインストール
npm install

# 3. 環境変数の設定
cp .env.local.example .env.local
# .env.local を編集して必要な値を設定

# 4. Prisma クライアントの生成
npx prisma generate

# 5. データベースマイグレーション
npx prisma migrate dev --name init

# 6. 開発サーバーの起動
npm run dev
```

## 📝 利用可能なスクリプト

```bash
# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバーの起動
npm start

# リンター実行
npm run lint

# コードフォーマット
npm run format

# 型チェック
npm run type-check
```

## 🗄️ データベース管理

```bash
# Prisma Studio の起動（データベースGUI）
npx prisma studio

# マイグレーションの作成
npx prisma migrate dev --name <migration-name>

# データベースのリセット
npx prisma migrate reset
```

## 🐳 Docker コマンド

```bash
# コンテナの起動
docker-compose up -d

# コンテナの停止
docker-compose down

# ログの確認
docker-compose logs -f

# PostgreSQL に接続
docker-compose exec postgres psql -U postgres -d slack_learning

# Redis に接続
docker-compose exec redis redis-cli
```

## 🧹 環境のクリーンアップ

```bash
./scripts/teardown.sh
```

## 📚 プロジェクト構造

```
.
├── src/
│   ├── app/                    # Next.js App Router (プレゼンテーション層)
│   ├── domain/                 # ドメイン層
│   ├── application/            # アプリケーション層
│   ├── infrastructure/         # インフラストラクチャ層
│   └── shared/                 # 共通ユーティリティ
├── prisma/
│   └── schema.prisma          # データベーススキーマ
├── docker-compose.yml         # Docker 設定
└── scripts/                   # セットアップスクリプト
```

## 🎓 学習パス

このプロジェクトは段階的に学習できるように設計されています：

1. **Phase 1**: プロジェクト基盤とオニオンアーキテクチャの理解
2. **Phase 2**: ドメイン層の実装（エンティティ、リポジトリ）
3. **Phase 3**: 認証システムの実装
4. **Phase 4**: チャンネルとメッセージ機能
5. **Phase 5**: リアルタイム通信
6. **Phase 6**: ファイルアップロード
7. **Phase 7**: バッチ処理と統計機能

詳細な実装タスクは `.kiro/specs/nodejs-slack-learning-app/tasks.md` を参照してください。

## 🤝 コントリビューション

このプロジェクトは学習目的で作成されています。改善提案やバグ報告は歓迎します。

## 📄 ライセンス

MIT License