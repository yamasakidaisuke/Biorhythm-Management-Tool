import { useState, useCallback } from 'react';
import { useMonthEntries } from '../hooks/useMonthEntries';
import { CalendarView } from '../components/history/CalendarView';
import { ListView } from '../components/history/ListView';

interface HistoryPageProps {
  onDateSelect: (date: string) => void;
}

type ViewMode = 'calendar' | 'list';

export function HistoryPage({ onDateSelect }: HistoryPageProps) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [viewMode, setViewMode] = useState<ViewMode>('calendar');

  const { entries, entriesMap, isLoading } = useMonthEntries(year, month);

  const handleMonthChange = useCallback((newYear: number, newMonth: number) => {
    setYear(newYear);
    setMonth(newMonth);
  }, []);

  const handleViewModeChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);
  }, []);

  return (
    <div className="page history-page">
      <header className="page-header">
        <h1>履歴</h1>
        <div className="view-toggle">
          <button
            type="button"
            className={viewMode === 'calendar' ? 'active' : ''}
            onClick={() => handleViewModeChange('calendar')}
          >
            カレンダー
          </button>
          <button
            type="button"
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => handleViewModeChange('list')}
          >
            リスト
          </button>
        </div>
      </header>

      <main className="page-content">
        {isLoading ? (
          <div className="loading">
            <p>読み込み中...</p>
          </div>
        ) : viewMode === 'calendar' ? (
          <CalendarView
            year={year}
            month={month}
            entriesMap={entriesMap}
            onDateSelect={onDateSelect}
            onMonthChange={handleMonthChange}
          />
        ) : (
          <ListView entries={entries} onDateSelect={onDateSelect} />
        )}
      </main>
    </div>
  );
}
