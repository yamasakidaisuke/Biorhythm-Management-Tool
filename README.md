# アンガーログ / Anger Log

> 自分を知ることが、自分を取り戻す第一歩だった。
> *Knowing yourself is the first step to reclaiming yourself.*

日々の身体・感情・知性の状態を記録するセルフケアアプリです。

A self-care app to track your daily physical, emotional, and intellectual states.

## 機能 / Features

- **バイオリズム記録**: 身体・感情・知性を1-10のスケールで記録
- **アクティビティ記録**: プランク、懸垂、サウナ、ケトル、飲酒、歌などの活動を記録
- **メモ機能**: 各カテゴリごとにメモを追加可能
- **履歴表示**: カレンダービュー/リストビューで過去の記録を確認

---

- **Biorhythm Tracking**: Record body, emotion, and intelligence on a 1-10 scale
- **Activity Logging**: Track activities like plank, pull-ups, sauna, kettlebell, alcohol, singing
- **Memo Function**: Add notes to each category
- **History View**: Review past records in calendar or list view

## 技術スタック / Tech Stack

- React 19 + TypeScript
- Vite
- Supabase (PostgreSQL)
- SWR

## セットアップ / Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create Supabase project

1. Create an account at [Supabase](https://supabase.com/)
2. Create a new project
3. Run `supabase-schema.sql` in SQL Editor to create the table

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Get these values from Supabase Dashboard:
- **Project URL**: Settings > API > Project URL
- **Anon Key**: Settings > API > Project API keys > anon public

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Start development server

```bash
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
```

## License

MIT
