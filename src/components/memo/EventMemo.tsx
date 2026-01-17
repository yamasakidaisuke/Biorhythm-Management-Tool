import { memo, useCallback, useState, useEffect } from 'react';
import { useDebouncedCallback } from '../../hooks/useDebounce';

interface EventMemoProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const EventMemo = memo(function EventMemo({
  value,
  onChange,
}: EventMemoProps) {
  const [localValue, setLocalValue] = useState(value ?? '');

  useEffect(() => {
    setLocalValue(value ?? '');
  }, [value]);

  const debouncedOnChange = useDebouncedCallback(onChange, 500);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setLocalValue(newValue);
      debouncedOnChange(newValue);
    },
    [debouncedOnChange]
  );

  return (
    <div className="event-memo">
      <label className="memo-label">
        <span>出来事メモ</span>
        <textarea
          value={localValue}
          onChange={handleChange}
          placeholder="今日の出来事..."
          rows={4}
          className="memo-textarea event-textarea"
        />
      </label>
    </div>
  );
});
