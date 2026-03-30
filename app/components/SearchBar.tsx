"use client";

interface SearchBarProps {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>; // function to update state
}

export default function SearchBar({ searchText, setSearchText }: SearchBarProps) {
  return (
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search missions"
      className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
    />
  );
}