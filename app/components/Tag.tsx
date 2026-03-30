"use client"

import { Tag as TagType } from "@/context/MissionContext"

interface TagProps {
  tag: TagType
}

export default function Tag({ tag }: TagProps) {
  // Default to gray if no color is set
  const colorClass = tag.color || "bg-gray-200"

  return (
    <span
      className={`px-2.5 py-1 text-xs font-medium rounded-full ${colorClass} text-white/90`}
    >
      {tag.name}
    </span>
  )
}
