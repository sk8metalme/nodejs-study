# クイックスタートガイド

## 🚀 5分でセットアップ

### 1. Docker Desktop を起動

まず、Docker Desktop を起動してください。

### 2. セットアップスクリプトを実行

```bash
npm run setup
```

または

```bash
./scripts/setup.sh
```

### 3. 開発サーバーを起動

```bash
npm run dev
```

### 4. ブラウザで確認

http://localhost:3000 を開いてください。

---

## 📋 よく使うコマンド

### 開発

```bash
npm run dev              # 開発サーバー起動
npm run build            # 本番ビルド
npm run lint             # リンター実行
npm run format           # コードフォーマット
```

### データベース

```bash
npm run db:studio        # Prisma Studio 起動
npm run db:migrate       # マイグレーション実行
npm run db:generate      # Prisma クライアント生成
npm run db:reset         # データベースリセット
```

### Docker

```bash
npm run docker:up        # コンテナ起動
npm run docker:down      # コンテナ停止
npm run docker:logs      # ログ表示
```

### ユーティリティ

```bash
npm run verify           # 環境確認
npm run teardown         # 環境クリーンアップ
```

---

## 🔧 トラブルシューティング

### Docker が起動しない

```bash
# Docker Desktop を起動してから
npm run verify
```

### ポートが使用中

```bash
npm run docker:down
npm run docker:up
```

### データベースエラー

```bash
npm run db:reset
npm run db:migrate
```

### 依存関係エラー

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 詳細ドキュメント

- [README.md](README.md) - プロジェクト概要
- [SETUP.md](SETUP.md) - 詳細なセットアップ手順
- [src/README.md](src/README.md) - アーキテクチャ説明

---

## 🎯 次のステップ

1. ✅ セットアップ完了
2. 📖 [オニオンアーキテクチャ](src/README.md)を理解する
3. 📋 [タスクリスト](.kiro/specs/nodejs-slack-learning-app/tasks.md)を確認する
4. 💻 実装を開始する

---

**問題が解決しない場合は [SETUP.md](SETUP.md) の詳細なトラブルシューティングを参照してください。**
