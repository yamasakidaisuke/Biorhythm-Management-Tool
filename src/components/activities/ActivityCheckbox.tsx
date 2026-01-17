import { memo, useCallback } from 'react';

interface ActivityCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

export const ActivityCheckbox = memo(function ActivityCheckbox({
  label,
  checked,
  onChange,
  id,
}: ActivityCheckboxProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    },
    [onChange]
  );

  return (
    <label htmlFor={id} className="activity-checkbox">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  );
});
