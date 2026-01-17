import { memo, useCallback, useState, useEffect } from 'react';
import { useDebouncedCallback } from '../../hooks/useDebounce';

interface BiorhythmMemoProps {
  label: string;
  value: string | null;
  onChange: (value: string) => void;
}

export const BiorhythmMemo = memo(function BiorhythmMemo({
  label,
  value,
  onChange,
}: BiorhythmMemoProps) {
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
    <div className="biorhythm-memo">
      <label className="memo-label">
        <span>{label}メモ</span>
        <textarea
          value={localValue}
          onChange={handleChange}
          placeholder={`${label}について...`}
          rows={2}
          className="memo-textarea"
        />
      </label>
    </div>
  );
});
