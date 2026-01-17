import { memo } from 'react';
import { parseDate, formatDate } from '../../lib/date-utils';
import type { DailyEntry } from '../../types';

interface ListViewProps {
  entries: DailyEntry[];
  onDateSelect: (date: string) => void;
}

export const ListView = memo(function ListView({
  entries,
  onDateSelect,
}: ListViewProps) {
  if (entries.length === 0) {
    return (
      <div className="list-view-empty">
        <p>この月の記録はありません</p>
      </div>
    );
  }

  return (
    <div className="list-view">
      {entries.map((entry) => {
        const levels = [entry.body_level, entry.emotion_level, entry.intelligence_level];
        const hasLevels = levels.some((l) => l !== null);

        return (
          <button
            key={entry.id}
            type="button"
            className="list-item"
            onClick={() => onDateSelect(entry.date)}
          >
            <div className="list-item-date">
              <time dateTime={entry.date}>{formatDate(parseDate(entry.date))}</time>
            </div>
            {hasLevels && (
              <div className="list-item-levels">
                {entry.body_level !== null && (
                  <span className="level-badge" data-level={entry.body_level}>
                    身{entry.body_level}
                  </span>
                )}
                {entry.emotion_level !== null && (
                  <span className="level-badge" data-level={entry.emotion_level}>
                    感{entry.emotion_level}
                  </span>
                )}
                {entry.intelligence_level !== null && (
                  <span className="level-badge" data-level={entry.intelligence_level}>
                    知{entry.intelligence_level}
                  </span>
                )}
              </div>
            )}
            {entry.event_memo && (
              <div className="list-item-memo">{entry.event_memo.slice(0, 50)}...</div>
            )}
          </button>
        );
      })}
    </div>
  );
});
