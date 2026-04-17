'use client';

import Image from 'next/image';
import { Settings } from 'lucide-react';
import SearchBar from './SearchBar';
import IconButton from './IconButton';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Mission Control' }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-400 bg-white/80 px-6 py-1 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Mission Control logo"
            width={62}
            height={62}
            priority
          />
          <h1 className="text-primary text-lg font-semibold tracking-tight">
            {title}
          </h1>
        </div>
        <SearchBar /> {/* Render the context-aware SearchBar */}
        {/* Settings button on the far right */}
        <IconButton
          icon={Settings}
          onClick={() => {
            /* Handle settings click */
          }}
        />
      </div>
    </header>
  );
}
