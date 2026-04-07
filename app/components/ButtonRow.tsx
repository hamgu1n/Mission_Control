"use client"

interface ButtonRowOption {
  label: string;   // display text (e.g. "Low", "Medium", "High")
  color: string;   // tailwind color name (e.g. "green", "yellow", "red")
}

interface ButtonRowProps {
  options: ButtonRowOption[];       // buttons to render
  selected: string;                 // currently selected label, or "" for none
  onSelect: (value: string) => void; // called with label on select, "" on deselect
}

export default function ButtonRow({ options, selected, onSelect }: ButtonRowProps) {
  return (
    <div className="flex gap-2">
      {options.map(({ label, color }) => {
        const isSelected = selected === label.toLowerCase();
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(isSelected ? "" : label.toLowerCase())}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
              isSelected
                ? `border-${color}-400 bg-${color}-500 text-${color}-600`
                : "border-stone-300 bg-white text-slate-400 hover:bg-stone-50"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
