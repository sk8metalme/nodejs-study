#!/bin/bash

# Slack Learning App 環境削除スクリプト

echo "🧹 Slack Learning App の環境をクリーンアップしています..."

# 1. Docker コンテナの停止と削除
echo "🛑 Docker コンテナを停止しています..."
docker-compose down

# 2. ボリュームの削除（オプション）
read -p "データベースのデータも削除しますか？ (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  echo "🗑️  ボリュームを削除しています..."
  docker-compose down -v
  echo "✅ ボリュームを削除しました"
fi

echo ""
echo "✨ クリーンアップが完了しました！"
