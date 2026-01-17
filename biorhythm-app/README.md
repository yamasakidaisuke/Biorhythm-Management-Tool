# Biorhythm Tracker

日々の身体・感情・知性の状態を記録するバイオリズム管理アプリです。

## 機能

- **バイオリズム記録**: 身体・感情・知性を1-10のスケールで記録
- **アクティビティ記録**: プランク、懸垂、サウナ、ケトル、飲酒、歌などの活動を記録
- **メモ機能**: 各カテゴリごとにメモを追加可能
- **履歴表示**: カレンダービュー/リストビューで過去の記録を確認

## 技術スタック

- React 19 + TypeScript
- Vite
- Supabase (PostgreSQL)
- SWR (データフェッチ)

## セットアップ

### 1. 依存関係のインストール

```bash
cd biorhythm-app
npm install
```

### 2. Supabaseプロジェクトの作成

1. [Supabase](https://supabase.com/) でアカウントを作成
2. 新しいプロジェクトを作成
3. SQL Editorで `supabase-schema.sql` を実行してテーブルを作成

### 3. 環境変数の設定

`.env.local` ファイルを作成:

```bash
cp .env.example .env.local
```

Supabaseダッシュボードから以下の値を取得して設定:
- **Project URL**: Settings > API > Project URL
- **Anon Key**: Settings > API > Project API keys > anon public

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:5173 でアプリが起動します。

## ビルド

```bash
npm run build
```

## ライセンス

MIT
