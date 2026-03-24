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

    setNewTitle(""); // reset input
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
          className="w-12 h-12 rounded-xl border border-black bg-black px-4 py-3 text-white transition hover:bg-white hover:text-black"
        >
          +
        </button>

        <button
          type="button"
          onClick={() => setShowTags(prev => !prev)}
          className="w-12 h-12 rounded-xl border border-black bg-black px-4 py-3 text-white transition hover:bg-white hover:text-black"
        >
          @
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
