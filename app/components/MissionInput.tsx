"use client"

import { useState, useContext } from "react";
import { MissionContext } from "@/context/MissionContext";

export default function MissionInput() {
  const context = useContext(MissionContext);
  const [newTitle, setNewTitle] = useState("");

  if (!context) return null; // component outside MissionProvider

  const { dispatch } = context;

  function handleAddMission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    dispatch({
      type: "ADD_MISSION",
      payload: { title: newTitle.trim() }
    });

    setNewTitle("");
  }

  return (
    <form onSubmit={handleAddMission} className="mb-4 flex gap-2">
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        placeholder="Add a new mission"
        className="flex-1 h-12 rounded-lg border border-gray-900 px-4 text-gray-950 outline-none placeholder:text-gray-400"
          />
      <button
        type="submit"
        className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-white hover:bg-gray-700"
        >
        +
      </button>
    </form>
  );
}
