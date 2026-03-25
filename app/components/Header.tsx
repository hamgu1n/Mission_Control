"use client";

import { Settings } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Mission Control" }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-white px-4 py-3">
      <div className="relative flex items-center justify-center">
        <h1 className="text-lg font-semibold text-black">{title}</h1>

        <button
          type="button"
          className="absolute right-0 w-10 h-10 flex items-center justify-center rounded-xl border border-black bg-white text-black hover:bg-black hover:text-white transition"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}