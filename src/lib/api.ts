import { supabase } from './supabase';
import type { DailyEntry, DailyEntryUpdate } from '../types';

export async function fetchDailyEntry(date: string): Promise<DailyEntry | null> {
  const { data, error } = await supabase
    .from('daily_entries')
    .select('*')
    .eq('date', date)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

export async function upsertDailyEntry(
  date: string,
  updates: DailyEntryUpdate
): Promise<DailyEntry> {
  const { data, error } = await supabase
    .from('daily_entries')
    .upsert({ date, ...updates }, { onConflict: 'date' })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchMonthEntries(
  year: number,
  month: number
): Promise<DailyEntry[]> {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = `${year}-${String(month).padStart(2, '0')}-31`;

  const { data, error } = await supabase
    .from('daily_entries')
    .select('*')
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });

  if (error) throw error;
  return data || [];
}
