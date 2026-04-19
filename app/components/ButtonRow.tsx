'use client';

interface ButtonRowOption {
  label: string;
  color: string;
}

interface ButtonRowProps {
  options: ButtonRowOption[];
  selected: string;
  onSelect: (value: string) => void;
}

const buttonColorStyles: Record<string, string> = {
  red: 'priority-red',
  yellow: 'priority-yellow',
  green: 'priority-green',
};

const defaultStyle = 'btn-secondary';

export default function ButtonRow({
  options,
  selected,
  onSelect,
}: ButtonRowProps) {
  return (
    <div className="flex gap-2">
      {options.map(({ label, color }) => {
        const value = label.toLowerCase();
        const isSelected = selected === value;

        const colorClass = buttonColorStyles[color] || defaultStyle;

        const className = isSelected
          ? `flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${colorClass}`
          : 'btn-secondary flex-1 px-3';

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(isSelected ? '' : value)}
            className={className}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
