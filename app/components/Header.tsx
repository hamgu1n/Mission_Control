'use client';

import { Settings } from 'lucide-react';
import SearchBar from './SearchBar';
import IconButton from './IconButton';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Mission Control' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-400 bg-white/80 px-6 py-4 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">
          {title}
        </h1>

        <SearchBar />

        <IconButton icon={Settings} onClick={() => {}} />
      </div>
    </header>
  );
}
