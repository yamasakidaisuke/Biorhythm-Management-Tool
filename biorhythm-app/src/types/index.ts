export interface DailyEntry {
  id: string;
  date: string;
  body_level: number | null;
  emotion_level: number | null;
  intelligence_level: number | null;
  plank: boolean;
  pullups: boolean;
  sauna: boolean;
  kettlebell: boolean;
  alcohol: boolean;
  singing: boolean;
  body_memo: string | null;
  emotion_memo: string | null;
  intelligence_memo: string | null;
  event_memo: string | null;
  created_at: string;
  updated_at: string;
}

export type DailyEntryUpdate = Partial<Omit<DailyEntry, 'id' | 'created_at' | 'updated_at'>>;

export interface Activity {
  key: keyof Pick<DailyEntry, 'plank' | 'pullups' | 'sauna' | 'kettlebell' | 'alcohol' | 'singing'>;
  label: string;
}

export const ACTIVITIES: Activity[] = [
  { key: 'plank', label: 'プランク' },
  { key: 'pullups', label: '懸垂' },
  { key: 'sauna', label: 'サウナ' },
  { key: 'kettlebell', label: 'ケトル' },
  { key: 'alcohol', label: '酒' },
  { key: 'singing', label: '歌' },
];

export interface BiorhythmCategory {
  key: 'body' | 'emotion' | 'intelligence';
  label: string;
  levelKey: 'body_level' | 'emotion_level' | 'intelligence_level';
  memoKey: 'body_memo' | 'emotion_memo' | 'intelligence_memo';
}

export const BIORHYTHM_CATEGORIES: BiorhythmCategory[] = [
  { key: 'body', label: '身体', levelKey: 'body_level', memoKey: 'body_memo' },
  { key: 'emotion', label: '感情', levelKey: 'emotion_level', memoKey: 'emotion_memo' },
  { key: 'intelligence', label: '知性', levelKey: 'intelligence_level', memoKey: 'intelligence_memo' },
];
