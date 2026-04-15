'use client';

import { type LucideIcon } from 'lucide-react';

interface IconButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  hoverColor?: 'none' | 'slate' | 'red' | 'green' | 'violet' | 'blue';
}

const hoverStyles: Record<
  NonNullable<IconButtonProps['hoverColor']>,
  { bg: string; text: string }
> = {
  none: { bg: '', text: '' },
  slate: { bg: 'hover:bg-stone-100', text: 'hover:text-slate-600' },
  red: { bg: 'hover:bg-red-50', text: 'hover:text-red-500' },
  green: { bg: 'hover:bg-green-50', text: 'hover:text-green-500' },
  violet: { bg: 'hover:bg-violet-100', text: 'hover:text-violet-600' },
  blue: { bg: 'hover:bg-blue-100', text: 'hover:text-blue-600' },
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
      className={`btn-icon ${styles.bg} ${styles.text}`}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
