import { memo, useCallback } from 'react';
import { getDaysInMonth, getFirstDayOfMonth, formatMonth } from '../../lib/date-utils';
import type { DailyEntry } from '../../types';

interface CalendarViewProps {
  year: number;
  month: number;
  entriesMap: Map<string, DailyEntry>;
  onDateSelect: (date: string) => void;
  onMonthChange: (year: number, month: number) => void;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export const CalendarView = memo(function CalendarView({
  year,
  month,
  entriesMap,
  onDateSelect,
  onMonthChange,
}: CalendarViewProps) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handlePrevMonth = useCallback(() => {
    if (month === 1) {
      onMonthChange(year - 1, 12);
    } else {
      onMonthChange(year, month - 1);
    }
  }, [year, month, onMonthChange]);

  const handleNextMonth = useCallback(() => {
    if (month === 12) {
      onMonthChange(year + 1, 1);
    } else {
      onMonthChange(year, month + 1);
    }
  }, [year, month, onMonthChange]);

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const getEntryIndicator = (day: number) => {
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const entry = entriesMap.get(dateStr);
    if (!entry) return null;

    const levels = [entry.body_level, entry.emotion_level, entry.intelligence_level].filter(
      (l): l is number => l !== null
    );
    if (levels.length === 0) return null;

    const avg = Math.round(levels.reduce((a, b) => a + b, 0) / levels.length);
    return avg;
  };

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button type="button" onClick={handlePrevMonth} aria-label="前月">
          ←
        </button>
        <span className="calendar-month">{formatMonth(year, month)}</span>
        <button type="button" onClick={handleNextMonth} aria-label="翌月">
          →
        </button>
      </div>

      <div className="calendar-weekdays">
        {WEEKDAYS.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar-grid">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="calendar-day empty" />;
          }

          const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const indicator = getEntryIndicator(day);

          return (
            <button
              key={day}
              type="button"
              className={`calendar-day ${indicator !== null ? 'has-entry' : ''}`}
              data-level={indicator}
              onClick={() => onDateSelect(dateStr)}
            >
              <span className="day-number tabular-nums">{day}</span>
              {indicator !== null && (
                <span className="day-indicator" data-level={indicator} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
