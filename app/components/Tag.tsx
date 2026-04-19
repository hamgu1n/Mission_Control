'use client';

import { Tag as TagType } from '@/context/MissionContext';

interface TagProps {
  tag: TagType;
}

export const colorMap: Record<string, string> = {
  'bg-red': 'tag-red',
  'bg-yellow': 'tag-yellow',
  'bg-green': 'tag-green',
  'bg-blue': 'tag-blue',
  'bg-purple': 'tag-purple',
  'bg-pink': 'tag-pink',
  'bg-amber': 'tag-amber',
  'bg-teal': 'tag-teal',
  'bg-orange': 'tag-orange',
  'bg-violet': 'tag-violet',
  'bg-slate': 'tag-slate',
  'bg-green-400': 'tag-green',
  'bg-black': 'tag-none',
  'tag-red': 'tag-red',
  'tag-yellow': 'tag-yellow',
  'tag-green': 'tag-green',
  'tag-blue': 'tag-blue',
  'tag-purple': 'tag-purple',
  'tag-pink': 'tag-pink',
  'tag-amber': 'tag-amber',
  'tag-teal': 'tag-teal',
  'tag-orange': 'tag-orange',
  'tag-violet': 'tag-violet',
  'tag-slate': 'tag-slate',
  'tag-none': 'tag-none',
};

export default function Tag({ tag }: TagProps) {
  const colorClass = colorMap[tag.color ?? ''] || 'tag-none';

  if (tag.type === 'status') {
    return (
      <div
        className={`h-3 w-3 rounded-full shadow-sm ${colorClass}`}
        title={tag.name}
      />
    );
  }

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${colorClass}`}
    >
      {tag.name}
    </span>
  );
}
