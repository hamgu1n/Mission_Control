"use client"

interface ListInputProps {
  items: string[];                      // current list of values
  setItems: (items: string[]) => void;  // state setter to update the list
  icon: string;                         // prefix character before each item (e.g. "-" or ">")
  addLabel: string;                     // label for the add button (e.g. "goal" or "link")
  placeholder: string;                  // placeholder text for the first empty input
}

export default function ListInput({ items, setItems, icon, addLabel, placeholder }: ListInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2.5 shadow-sm focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100 transition">
          <span className="text-sm text-slate-400 select-none">{icon}</span>
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const updated = [...items];
              updated[i] = e.target.value;
              setItems(updated);
            }}
            onKeyDown={(e) => {
              // Enter adds a new item below and focuses it
              if (e.key === "Enter") {
                e.preventDefault();
                const updated = [...items];
                updated.splice(i + 1, 0, "");
                setItems(updated);
                setTimeout(() => {
                  const inputs = (e.target as HTMLInputElement).closest("div.flex.flex-col")?.querySelectorAll("input");
                  inputs?.[i + 1]?.focus();
                }, 0);
              }
              // Backspace on empty item removes it and focuses the one above
              if (e.key === "Backspace" && item === "" && items.length > 1) {
                e.preventDefault();
                const updated = [...items];
                updated.splice(i, 1);
                setItems(updated);
                setTimeout(() => {
                  const inputs = (e.target as HTMLInputElement).closest("div.flex.flex-col")?.querySelectorAll("input");
                  inputs?.[Math.max(0, i - 1)]?.focus();
                }, 0);
              }
            }}
            placeholder={i === 0 ? placeholder : ""}
            className="flex-1 text-sm text-slate-800 outline-none placeholder:text-slate-400 bg-transparent"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => setItems(items.length === 0 ? [""] : [...items, ""])}
        className={`w-full rounded-xl border border-dashed border-stone-300 px-4 ${items.length === 0 ? "py-2.5 text-sm" : "py-1.5 text-xs"} text-slate-400 transition hover:border-violet-300 hover:text-violet-400`}
      >
        + {items.length === 0 ? `Add a ${addLabel}` : `Add another ${addLabel}`}
      </button>
    </div>
  );
}
