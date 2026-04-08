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
  "bg-red": { bg: "bg-red-200", text: "text-red-700", border: "border-red-400" },
  "bg-yellow": { bg: "bg-yellow-200", text: "text-yellow-700", border: "border-yellow-400" },
  "bg-green": { bg: "bg-green-200", text: "text-green-700", border: "border-green-400" },
  "bg-blue": { bg: "bg-blue-200", text: "text-blue-700", border: "border-blue-400" },
  "bg-purple": { bg: "bg-purple-200", text: "text-purple-700", border: "border-purple-400" },
  "bg-pink": { bg: "bg-pink-200", text: "text-pink-700", border: "border-pink-400" },
  "bg-amber": { bg: "bg-amber-200", text: "text-amber-700", border: "border-amber-400" },
  "bg-teal": { bg: "bg-teal-200", text: "text-teal-700", border: "border-teal-400" },
  "bg-orange": { bg: "bg-orange-200", text: "text-orange-700", border: "border-orange-400" },
  "bg-violet": { bg: "bg-violet-200", text: "text-violet-700", border: "border-violet-400" },
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
