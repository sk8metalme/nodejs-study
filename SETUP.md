# セットアップガイド

このドキュメントでは、Slack Learning App の開発環境をセットアップする手順を説明します。

## 前提条件の確認

### 1. Node.js のインストール確認

```bash
node --version  # v18.0.0 以上が必要
npm --version
```

Node.js がインストールされていない場合は、[公式サイト](https://nodejs.org/)からダウンロードしてください。

### 2. Docker のインストール確認

```bash
docker --version
docker-compose --version
```

Docker がインストールされていない場合：
- **Mac**: [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop)
- **Windows**: [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)

**重要**: Docker Desktop を起動してください。

## セットアップ手順

### オプション1: 自動セットアップ（推奨）

```bash
# セットアップスクリプトを実行
./scripts/setup.sh
```

このスクリプトは以下を自動的に実行します：
1. Docker コンテナの起動（PostgreSQL, Redis）
2. データベース接続の確認
3. npm パッケージのインストール
4. Prisma クライアントの生成
5. データベースマイグレーションの実行

### オプション2: 手動セットアップ

#### ステップ1: Docker コンテナの起動

```bash
# Docker Desktop が起動していることを確認
docker ps

# コンテナを起動
docker-compose up -d

# コンテナの状態を確認
docker-compose ps
```

期待される出力：
```
NAME                        STATUS
slack-learning-postgres     Up
slack-learning-redis        Up
```

#### ステップ2: データベース接続の確認

```bash
# PostgreSQL の接続確認
docker-compose exec postgres pg_isready -U postgres

# Redis の接続確認
docker-compose exec redis redis-cli ping
```

#### ステップ3: 依存関係のインストール

```bash
npm install
```

#### ステップ4: 環境変数の設定

`.env.local` ファイルが既に作成されています。必要に応じて編集してください：

```bash
# .env.local の内容を確認
cat .env.local
```

#### ステップ5: Prisma のセットアップ

```bash
# Prisma クライアントの生成
npx prisma generate

# データベースマイグレーションの実行
npx prisma migrate dev --name init
```

#### ステップ6: 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開いてください。

## トラブルシューティング

### Docker が起動しない

**症状**: `Cannot connect to the Docker daemon` エラー

**解決方法**:
1. Docker Desktop を起動してください
2. システムトレイ/メニューバーで Docker のアイコンを確認
3. Docker が完全に起動するまで待ってください（数分かかる場合があります）

### ポートが既に使用されている

**症状**: `port is already allocated` エラー

**解決方法**:
```bash
# 使用中のポートを確認
lsof -i :5432  # PostgreSQL
lsof -i :6379  # Redis
lsof -i :3000  # Next.js

# 既存のコンテナを停止
docker-compose down
```

### データベースマイグレーションエラー

**症状**: `P1001: Can't reach database server` エラー

**解決方法**:
```bash
# コンテナが起動しているか確認
docker-compose ps

# コンテナを再起動
docker-compose restart postgres

# 数秒待ってから再試行
npx prisma migrate dev --name init
```

### npm install エラー

**症状**: パッケージのインストールに失敗

**解決方法**:
```bash
# キャッシュをクリア
npm cache clean --force

# node_modules を削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## データベースの確認

### Prisma Studio を使用

```bash
npx prisma studio
```

ブラウザで http://localhost:5555 が開き、データベースの内容を GUI で確認できます。

### PostgreSQL に直接接続

```bash
docker-compose exec postgres psql -U postgres -d slack_learning

# SQL コマンドの例
\dt          # テーブル一覧
\d users     # users テーブルの構造
SELECT * FROM users;
\q           # 終了
```

### Redis に接続

```bash
docker-compose exec redis redis-cli

# Redis コマンドの例
PING         # 接続確認
KEYS *       # すべてのキーを表示
quit         # 終了
```

## 開発の開始

セットアップが完了したら、以下のコマンドで開発を開始できます：

```bash
# 開発サーバーの起動
npm run dev

# 別のターミナルで Prisma Studio を起動（オプション）
npx prisma studio

# コードの変更を監視（自動リロード有効）
```

## 環境のクリーンアップ

開発を終了する場合：

```bash
# コンテナの停止
docker-compose down

# データも含めて完全に削除
./scripts/teardown.sh
```

## 次のステップ

1. [src/README.md](src/README.md) でオニオンアーキテクチャについて学ぶ
2. `.kiro/specs/nodejs-slack-learning-app/` でプロジェクトの要件と設計を確認
3. タスクリストに従って実装を進める

## サポート

問題が解決しない場合は、以下を確認してください：
- Docker Desktop が最新版であること
- Node.js が v18 以上であること
- ポート 3000, 5432, 6379 が利用可能であること
