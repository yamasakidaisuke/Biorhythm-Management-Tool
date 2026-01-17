-- Biorhythm Tracker Schema
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS daily_entries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,

  -- Biorhythm levels (1-10 scale)
  body_level INTEGER CHECK (body_level >= 1 AND body_level <= 10),
  emotion_level INTEGER CHECK (emotion_level >= 1 AND emotion_level <= 10),
  intelligence_level INTEGER CHECK (intelligence_level >= 1 AND intelligence_level <= 10),

  -- Activity checkboxes
  plank BOOLEAN DEFAULT FALSE,
  pullups BOOLEAN DEFAULT FALSE,
  sauna BOOLEAN DEFAULT FALSE,
  kettlebell BOOLEAN DEFAULT FALSE,
  alcohol BOOLEAN DEFAULT FALSE,
  singing BOOLEAN DEFAULT FALSE,

  -- Memos
  body_memo TEXT,
  emotion_memo TEXT,
  intelligence_memo TEXT,
  event_memo TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for fast date lookups
CREATE INDEX IF NOT EXISTS idx_daily_entries_date ON daily_entries(date);

-- Disable RLS for single user
ALTER TABLE daily_entries DISABLE ROW LEVEL SECURITY;

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_daily_entries_updated_at ON daily_entries;
CREATE TRIGGER update_daily_entries_updated_at
  BEFORE UPDATE ON daily_entries
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
