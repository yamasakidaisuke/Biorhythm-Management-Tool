import { memo, useCallback } from 'react';
import { formatDate, addDays, isToday } from '../../lib/date-utils';

interface DateSelectorProps {
  date: Date;
  onChange: (date: Date) => void;
}

export const DateSelector = memo(function DateSelector({
  date,
  onChange,
}: DateSelectorProps) {
  const handlePrevious = useCallback(() => {
    onChange(addDays(date, -1));
  }, [date, onChange]);

  const handleNext = useCallback(() => {
    onChange(addDays(date, 1));
  }, [date, onChange]);

  const handleToday = useCallback(() => {
    onChange(new Date());
  }, [onChange]);

  const isTodayDate = isToday(date);

  return (
    <nav className="date-selector" aria-label="日付選択">
      <button
        type="button"
        onClick={handlePrevious}
        aria-label="前日"
        className="date-nav-btn"
      >
        ←
      </button>

      <time
        dateTime={date.toISOString().split('T')[0]}
        className="date-display"
      >
        {formatDate(date)}
      </time>

      {!isTodayDate && (
        <button
          type="button"
          onClick={handleToday}
          className="date-today-btn"
        >
          今日
        </button>
      )}

      <button
        type="button"
        onClick={handleNext}
        aria-label="翌日"
        className="date-nav-btn"
      >
        →
      </button>
    </nav>
  );
});
