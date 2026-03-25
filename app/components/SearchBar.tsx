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
      className="w-full rounded-xl border border-black px-4 py-3 mb-4 text-black outline-none placeholder:text-black/50"
    />
  );
}