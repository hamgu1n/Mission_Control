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

const buttonColorStyles: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  red: { bg: 'bg-red-200', text: 'text-red-700', border: 'border-red-400' },
  yellow: {
    bg: 'bg-yellow-200',
    text: 'text-yellow-700',
    border: 'border-yellow-400',
  },
  green: {
    bg: 'bg-green-200',
    text: 'text-green-700',
    border: 'border-green-400',
  },
};

const defaultStyles = {
  bg: 'bg-stone-200',
  text: 'text-stone-700',
  border: 'border-stone-300',
};

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

        const colors = buttonColorStyles[color] || defaultStyles;

        const className = isSelected
          ? `flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${colors.border} ${colors.bg} ${colors.text}`
          : 'flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition border-stone-300 bg-white text-slate-400 hover:bg-stone-50';

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
