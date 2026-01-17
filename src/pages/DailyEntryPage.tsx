import { useCallback } from 'react';
import { useDailyEntry } from '../hooks/useDailyEntry';
import { DateSelector } from '../components/date/DateSelector';
import { LevelSlider } from '../components/biorhythm/LevelSlider';
import { BiorhythmMemo } from '../components/biorhythm/BiorhythmMemo';
import { ActivityCheckbox } from '../components/activities/ActivityCheckbox';
import { EventMemo } from '../components/memo/EventMemo';
import { BIORHYTHM_CATEGORIES, ACTIVITIES } from '../types';
import type { DailyEntryUpdate } from '../types';

interface DailyEntryPageProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

export function DailyEntryPage({ date, onDateChange }: DailyEntryPageProps) {
  const dateString = date.toISOString().split('T')[0];
  const { entry, isLoading, updateEntry } = useDailyEntry(dateString);

  const handleUpdate = useCallback(
    (updates: DailyEntryUpdate) => {
      updateEntry(updates);
    },
    [updateEntry]
  );

  if (isLoading) {
    return (
      <div className="page loading">
        <p>読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="page daily-entry-page">
      <header className="page-header">
        <DateSelector date={date} onChange={onDateChange} />
      </header>

      <main className="page-content">
        <section className="section biorhythm-section">
          <h2 className="section-title">バイオリズム</h2>
          {BIORHYTHM_CATEGORIES.map((category) => (
            <div key={category.key} className="biorhythm-item">
              <LevelSlider
                label={category.label}
                value={entry?.[category.levelKey] ?? null}
                onChange={(value) => handleUpdate({ [category.levelKey]: value })}
              />
              <BiorhythmMemo
                label={category.label}
                value={entry?.[category.memoKey] ?? null}
                onChange={(value) => handleUpdate({ [category.memoKey]: value })}
              />
            </div>
          ))}
        </section>

        <section className="section activities-section">
          <h2 className="section-title">アクティビティ</h2>
          <div className="activities-grid">
            {ACTIVITIES.map((activity) => (
              <ActivityCheckbox
                key={activity.key}
                id={`activity-${activity.key}`}
                label={activity.label}
                checked={entry?.[activity.key] ?? false}
                onChange={(checked) => handleUpdate({ [activity.key]: checked })}
              />
            ))}
          </div>
        </section>

        <section className="section event-section">
          <EventMemo
            value={entry?.event_memo ?? null}
            onChange={(value) => handleUpdate({ event_memo: value })}
          />
        </section>
      </main>
    </div>
  );
}
