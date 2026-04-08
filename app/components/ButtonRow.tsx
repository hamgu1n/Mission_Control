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

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  "red": { bg: "bg-red-200", text: "text-red-700", border: "border-red-400" },
  "yellow": { bg: "bg-yellow-200", text: "text-yellow-700", border: "border-yellow-400" },
  "green": { bg: "bg-green-200", text: "text-green-700", border: "border-green-400" }
};



export default function ButtonRow({ options, selected, onSelect }: ButtonRowProps) {
  return (
    <div className="flex gap-2">
      {options.map(({ label, color }) => {
        const isSelected = selected === label.toLowerCase();
        const colors = colorMap[color] || {
          bg: "bg-stone-200",
          text: "text-stone-700",
          border: "border-stone-300",
        };
        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect(isSelected ? "" : label.toLowerCase())}
            className={`flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition ${
              isSelected
                ? `${colors.border} ${colors.bg} ${colors.text}`
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
