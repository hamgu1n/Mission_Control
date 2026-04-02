"use client"

import { type LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon;        // lucide icon component to render
  onClick: () => void;     // click handler
  hoverColor?: string;     // tailwind color name for hover (e.g. "red", "violet", "slate")
}

export default function IconButton({ icon: Icon, onClick, hoverColor = "slate" }: IconButtonProps) {
  const bg = hoverColor === "slate" ? "hover:bg-stone-100" : `hover:bg-${hoverColor}-50`;
  const text = hoverColor === "slate" ? "hover:text-slate-600" : `hover:text-${hoverColor}-500`;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-1.5 rounded-lg text-slate-400 transition ${text} ${bg}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
