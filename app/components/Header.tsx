'use client';

import Image from 'next/image';
import { Settings } from 'lucide-react';
import SearchBar from './SearchBar';
import IconButton from './IconButton';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  title?: string;
}

export default function Header({ title = 'Mission Control' }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header sticky top-0 z-50 w-full border-b px-6 py-1 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex shrink-0 items-center gap-2">
          <Image
            src={theme === 'dark' ? '/logo-light.svg' : '/logo.svg'}
            alt="Mission Control logo"
            width={62}
            height={62}
            priority
          />
          <h1 className="text-primary text-lg font-semibold tracking-tight">
            {title}
          </h1>
        </div>

        <SearchBar />

        <IconButton icon={Settings} onClick={toggleTheme} />
      </div>
    </header>
  );
}
