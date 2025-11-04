#!/bin/bash

# 環境確認スクリプト

echo "🔍 Slack Learning App の環境を確認しています..."
echo ""

# 色の定義
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# チェック結果を保存
ALL_CHECKS_PASSED=true

# 1. Node.js のバージョン確認
echo "📦 Node.js のバージョンを確認しています..."
if command -v node &> /dev/null; then
  NODE_VERSION=$(node --version)
  echo -e "${GREEN}✓${NC} Node.js がインストールされています: $NODE_VERSION"
else
  echo -e "${RED}✗${NC} Node.js がインストールされていません"
  ALL_CHECKS_PASSED=false
fi
echo ""

# 2. npm のバージョン確認
echo "📦 npm のバージョンを確認しています..."
if command -v npm &> /dev/null; then
  NPM_VERSION=$(npm --version)
  echo -e "${GREEN}✓${NC} npm がインストールされています: $NPM_VERSION"
else
  echo -e "${RED}✗${NC} npm がインストールされていません"
  ALL_CHECKS_PASSED=false
fi
echo ""

# 3. Docker のインストール確認
echo "🐳 Docker のインストールを確認しています..."
if command -v docker &> /dev/null; then
  DOCKER_VERSION=$(docker --version)
  echo -e "${GREEN}✓${NC} Docker がインストールされています: $DOCKER_VERSION"
else
  echo -e "${RED}✗${NC} Docker がインストールされていません"
  ALL_CHECKS_PASSED=false
fi
echo ""

# 4. Docker の起動確認
echo "🐳 Docker の起動状態を確認しています..."
if docker ps &> /dev/null; then
  echo -e "${GREEN}✓${NC} Docker が起動しています"
else
  echo -e "${RED}✗${NC} Docker が起動していません。Docker Desktop を起動してください"
  ALL_CHECKS_PASSED=false
fi
echo ""

# 5. Docker Compose の確認
echo "🐳 Docker Compose を確認しています..."
if command -v docker-compose &> /dev/null; then
  COMPOSE_VERSION=$(docker-compose --version)
  echo -e "${GREEN}✓${NC} Docker Compose が利用可能です: $COMPOSE_VERSION"
else
  echo -e "${RED}✗${NC} Docker Compose が利用できません"
  ALL_CHECKS_PASSED=false
fi
echo ""

# 6. コンテナの起動確認
echo "📦 Docker コンテナの状態を確認しています..."
if docker-compose ps | grep -q "Up"; then
  echo -e "${GREEN}✓${NC} Docker コンテナが起動しています"
  docker-compose ps
else
  echo -e "${YELLOW}⚠${NC} Docker コンテナが起動していません"
  echo "  'docker-compose up -d' を実行してください"
fi
echo ""

# 7. node_modules の確認
echo "📚 依存関係のインストールを確認しています..."
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules が存在します"
else
  echo -e "${YELLOW}⚠${NC} node_modules が存在しません"
  echo "  'npm install' を実行してください"
fi
echo ""

# 8. .env.local の確認
echo "⚙️  環境変数ファイルを確認しています..."
if [ -f ".env.local" ]; then
  echo -e "${GREEN}✓${NC} .env.local が存在します"
else
  echo -e "${YELLOW}⚠${NC} .env.local が存在しません"
  echo "  '.env.local.example' をコピーして '.env.local' を作成してください"
fi
echo ""

# 9. Prisma クライアントの確認
echo "🔧 Prisma クライアントを確認しています..."
if [ -d "node_modules/.prisma" ]; then
  echo -e "${GREEN}✓${NC} Prisma クライアントが生成されています"
else
  echo -e "${YELLOW}⚠${NC} Prisma クライアントが生成されていません"
  echo "  'npx prisma generate' を実行してください"
fi
echo ""

# 10. ポートの使用状況確認
echo "🔌 ポートの使用状況を確認しています..."
check_port() {
  PORT=$1
  NAME=$2
  if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} ポート $PORT ($NAME) は使用中です"
  else
    echo -e "${YELLOW}⚠${NC} ポート $PORT ($NAME) は使用されていません"
  fi
}

check_port 5432 "PostgreSQL"
check_port 6379 "Redis"
echo ""

# 結果のサマリー
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ "$ALL_CHECKS_PASSED" = true ]; then
  echo -e "${GREEN}✨ すべての必須チェックに合格しました！${NC}"
  echo ""
  echo "次のステップ:"
  echo "  1. docker-compose up -d    # コンテナを起動（未起動の場合）"
  echo "  2. npm install             # 依存関係をインストール（未実行の場合）"
  echo "  3. npx prisma generate     # Prisma クライアントを生成"
  echo "  4. npx prisma migrate dev  # データベースマイグレーション"
  echo "  5. npm run dev             # 開発サーバーを起動"
else
  echo -e "${RED}⚠️  いくつかの問題が見つかりました${NC}"
  echo ""
  echo "SETUP.md を参照して、環境をセットアップしてください"
fi
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
