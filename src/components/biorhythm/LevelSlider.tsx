import { memo, useCallback } from 'react';

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

interface LevelSliderProps {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
}

export const LevelSlider = memo(function LevelSlider({
  label,
  value,
  onChange,
}: LevelSliderProps) {
  const handleLevelClick = useCallback(
    (level: number) => {
      onChange(level);
    },
    [onChange]
  );

  const handleClear = useCallback(() => {
    onChange(null);
  }, [onChange]);

  return (
    <div className="level-slider" role="group" aria-label={`${label}レベル`}>
      <div className="level-slider-header">
        <span className="level-label">{label}</span>
        <span className="level-value tabular-nums">{value ?? '—'}</span>
        {value !== null && (
          <button
            type="button"
            onClick={handleClear}
            aria-label={`${label}レベルをクリア`}
            className="level-clear"
          >
            ×
          </button>
        )}
      </div>
      <div className="level-segments">
        {LEVELS.map((level) => (
          <button
            key={level}
            type="button"
            className={`level-segment ${value !== null && level <= value ? 'active' : ''}`}
            data-level={level}
            onClick={() => handleLevelClick(level)}
            aria-label={`レベル ${level}`}
            aria-pressed={value === level}
          >
            <span className="tabular-nums">{level}</span>
          </button>
        ))}
      </div>
    </div>
  );
});
