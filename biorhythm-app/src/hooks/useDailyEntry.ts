import useSWR, { useSWRConfig } from 'swr';
import { useCallback } from 'react';
import { fetchDailyEntry, upsertDailyEntry } from '../lib/api';
import type { DailyEntry, DailyEntryUpdate } from '../types';

export function useDailyEntry(date: string) {
  const { mutate } = useSWRConfig();

  const { data, error, isLoading } = useSWR(
    ['daily-entry', date],
    () => fetchDailyEntry(date),
    {
      revalidateOnFocus: false,
      dedupingInterval: 2000,
    }
  );

  const updateEntry = useCallback(
    async (updates: DailyEntryUpdate) => {
      mutate(
        ['daily-entry', date],
        (current: DailyEntry | null | undefined) =>
          current ? { ...current, ...updates } : ({ date, ...updates } as DailyEntry),
        false
      );

      try {
        const updated = await upsertDailyEntry(date, updates);
        mutate(['daily-entry', date], updated, false);
        return updated;
      } catch (err) {
        mutate(['daily-entry', date]);
        throw err;
      }
    },
    [date, mutate]
  );

  return {
    entry: data,
    isLoading,
    error,
    updateEntry,
  };
}
