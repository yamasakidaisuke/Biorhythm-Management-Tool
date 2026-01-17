import useSWR from 'swr';
import { useMemo } from 'react';
import { fetchMonthEntries } from '../lib/api';
import type { DailyEntry } from '../types';

export function useMonthEntries(year: number, month: number) {
  const { data, error, isLoading } = useSWR(
    ['month-entries', year, month],
    () => fetchMonthEntries(year, month),
    {
      revalidateOnFocus: false,
    }
  );

  const entriesMap = useMemo(() => {
    const map = new Map<string, DailyEntry>();
    if (data) {
      for (const entry of data) {
        map.set(entry.date, entry);
      }
    }
    return map;
  }, [data]);

  return {
    entries: data || [],
    entriesMap,
    isLoading,
    error,
  };
}
