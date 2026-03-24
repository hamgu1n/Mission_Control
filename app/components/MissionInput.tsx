"use client"

import { useState, useContext } from "react";
import { MissionContext , Tag} from "@/context/MissionContext";

const tagColors = [
  "bg-red-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-orange-400",
  "bg-violet-400",
]


export default function MissionInput() {
  const context = useContext(MissionContext);
  const [newTitle, setNewTitle] = useState("");
  const [showTags, setShowTags] = useState(false);
  const [newTags, setNewTags] = useState("")

  if (!context) return null; // component outside MissionProvider

  const { dispatch } = context;

  function handleAddMission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTitle.trim()) return; // use local state

    const tagsArray: Tag[] = [
      { name: "New", color: "bg-blue-400", type: "status" as const },
      ...newTags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(tag => ({
          name: tag,
          color: tagColors[Math.floor(Math.random() * tagColors.length)],
          type: "label" as const
        }))
    ];

    dispatch({
      type: "ADD_MISSION",
      payload: {
        title: newTitle.trim(),
        tags: tagsArray
      }
    });

    setNewTitle("");
    setNewTags("");
  }

  return (
    <form onSubmit={handleAddMission} className="mb-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new mission"
          className="flex-1 rounded-xl border border-black px-4 py-3 text-black outline-none placeholder:text-black/50"
        />

        <button
          type="submit"
          className="w-12 h-12 flex items-center justify-center rounded-xl border border-black bg-black text-white transition hover:bg-white hover:text-black p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[50%] h-[50%]"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => setShowTags(prev => !prev)}
          className="w-12 h-12 flex items-center justify-center rounded-xl border border-black bg-black text-white transition hover:bg-white hover:text-black p-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[50%] h-[50%]"
          >
            <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
          </svg>
        </button>
      </div>
      {showTags && (
        <input
          type="text"
          value={newTags}
          onChange={(e) => setNewTags(e.target.value)}
          placeholder="Add tags separated by a comma..."
          className="w-full rounded-xl border border-black px-4 py-3 text-black outline-none placeholder:text-black/50"
        />
      )}
    </form>
  );
}
