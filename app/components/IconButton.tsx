'use client';

import { type LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  hoverColor?: 'none' | 'slate' | 'red' | 'green' | 'violet' | 'blue';
}

const hoverStyles: Record<
  NonNullable<IconButtonProps['hoverColor']>,
  string
> = {
  none: '',
  slate: 'hover:text-slate-600',
  red: 'hover:text-red-500',
  green: 'hover:text-green-500',
  violet: 'hover:text-violet-600',
  blue: 'hover:text-blue-600',
};

export default function IconButton({
  icon: Icon,
  onClick,
  hoverColor = 'slate',
}: IconButtonProps) {
  const styles = hoverStyles[hoverColor] ?? hoverStyles.slate;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`btn-icon ${styles}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
