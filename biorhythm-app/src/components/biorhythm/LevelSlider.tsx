import { memo, useCallback } from 'react';

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
        {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
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
