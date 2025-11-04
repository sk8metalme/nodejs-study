#!/bin/bash

# Slack Learning App セットアップスクリプト

echo "🚀 Slack Learning App のセットアップを開始します..."

# 1. Docker コンテナの起動
echo "📦 Docker コンテナを起動しています..."
docker-compose up -d

# 2. コンテナの起動を待機
echo "⏳ データベースの起動を待っています..."
sleep 5

# 3. データベース接続確認
echo "🔍 データベース接続を確認しています..."
docker-compose exec -T postgres pg_isready -U postgres

if [ $? -eq 0 ]; then
  echo "✅ PostgreSQL が正常に起動しました"
else
  echo "❌ PostgreSQL の起動に失敗しました"
  exit 1
fi

# 4. Redis 接続確認
echo "🔍 Redis 接続を確認しています..."
docker-compose exec -T redis redis-cli ping

if [ $? -eq 0 ]; then
  echo "✅ Redis が正常に起動しました"
else
  echo "❌ Redis の起動に失敗しました"
  exit 1
fi

# 5. 依存関係のインストール
echo "📚 依存関係をインストールしています..."
npm install

# 6. Prisma クライアントの生成
echo "🔧 Prisma クライアントを生成しています..."
npx prisma generate

# 7. データベースマイグレーション
echo "🗄️  データベースマイグレーションを実行しています..."
npx prisma migrate dev --name init

echo ""
echo "✨ セットアップが完了しました！"
echo ""
echo "次のコマンドで開発サーバーを起動できます:"
echo "  npm run dev"
echo ""
echo "アプリケーションは http://localhost:3000 で起動します"
