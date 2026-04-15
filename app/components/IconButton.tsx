"use client";

import { type LucideIcon } from "lucide-react";

interface IconButtonProps {
  icon: LucideIcon; // lucide icon component to render
  onClick: () => void; // click handler
  hoverColor?: string; // tailwind color name for hover (e.g. "red", "violet", "slate")
}

export default function IconButton({
  icon: Icon,
  onClick,
  hoverColor = "slate",
}: IconButtonProps) {
  const hoverBgClasses: Record<string, string> = {
    none: "",
    slate: "hover:bg-stone-100",
    red: "hover:bg-red-50",
    green: "hover:bg-green-50",
    violet: "hover:bg-violet-100",
    blue: "hover:bg-blue-100",
  };

  const hoverTextClasses: Record<string, string> = {
    slate: "hover:text-slate-600",
    red: "hover:text-red-500",
    green: "hover:text-green-500",
    violet: "hover:text-violet-600",
    blue: "hover:text-blue-600",
  };

  const bg = hoverBgClasses[hoverColor] || hoverBgClasses.slate;
  const text = hoverTextClasses[hoverColor] || hoverTextClasses.slate;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-icon ${text} ${bg}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
