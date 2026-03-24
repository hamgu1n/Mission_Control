"use client"
import { useState } from "react";
import { Mission as MissionType } from "@/context/MissionContext";
import Tag from "./Tag";

interface MissionProps {
  mission: MissionType;
}

export default function Mission({ mission }: MissionProps) {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col w-full px-5 py-4 rounded-lg bg-gray-300 hover:bg-gray-300 shadow-sm">

        {/* Top row: title + toggle button */}
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-900">
            {mission.title}
          </p>
          <button
            type="button"
            onClick={() => setShowTags(prev => !prev)}
            className="text-gray-500 hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-circle-alert-icon lucide-circle-alert"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </button>
        </div>

        {/* Tags row */}
        {showTags && mission.tags && mission.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {mission.tags.map((tag, index) => (
              <Tag key={index} tag={tag} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
