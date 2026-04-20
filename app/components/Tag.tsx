'use client';

import { Tag as TagType } from '@/context/MissionContext';

interface TagProps {
  tag: TagType;
}

export default function Tag({ tag }: TagProps) {
  const colorClass = tag.color || 'tag-none';

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
