'use client';

import { Tag as TagType } from '@/context/MissionContext';

interface TagProps {
  tag: TagType;
}

// Mapping from your tag.color values to actual Tailwind classes
export const colorMap: Record<string, { bg: string; text: string }> = {
  'bg-red': { bg: 'bg-red-200', text: 'text-red-700' },
  'bg-yellow': { bg: 'bg-yellow-200', text: 'text-yellow-700' },
  'bg-green': { bg: 'bg-green-200', text: 'text-green-700' },
  'bg-blue': { bg: 'bg-blue-200', text: 'text-blue-700' },
  'bg-purple': { bg: 'bg-purple-200', text: 'text-purple-700' },
  'bg-pink': { bg: 'bg-pink-200', text: 'text-pink-700' },
  'bg-amber': { bg: 'bg-amber-200', text: 'text-amber-700' },
  'bg-teal': { bg: 'bg-teal-200', text: 'text-teal-700' },
  'bg-orange': { bg: 'bg-orange-200', text: 'text-orange-700' },
  'bg-violet': { bg: 'bg-violet-200', text: 'text-violet-700' },
};

export default function Tag({ tag }: TagProps) {
  const tagColor = tag.color ?? '';

  // Status tags render as small colored circles
  if (tag.type === 'status') {
    const circleColor = colorMap[tagColor]?.bg || 'bg-stone-400';
    return (
      <div
        className={`h-3 w-3 rounded-full shadow-sm ${circleColor}`}
        title={tag.name}
      />
    );
  }

  // For other tag types, render pill with background + text color
  const colors = colorMap[tagColor] || {
    bg: 'bg-stone-200',
    text: 'text-stone-700',
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors.bg} ${colors.text}`}
    >
      {tag.name}
    </span>
  );
}
