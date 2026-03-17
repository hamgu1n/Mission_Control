"use client"

import { useContext, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";

export default function MissionControl() {
  const context = useContext(MissionContext);
  const [newTitle, setNewTitle] = useState(""); // fixed: added state

  if (!context) return null; // ensures component is inside MissionProvider

  const { state, dispatch } = context;

  function handleAddMission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTitle.trim()) return; // use local state

    dispatch({
      type: "ADD_MISSION",
      payload: { title: newTitle.trim() }
    });

    setNewTitle(""); // reset input
  }

  return (
    <div className="w-full max-w-md mx-auto rounded-2xl border border-black bg-white p-6 shadow-sm">
      <form onSubmit={handleAddMission} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new mission"
          className="flex-1 rounded-xl border border-black px-4 py-3 text-black outline-none placeholder:text-black/50"
        />
        <button
          type="submit"
          className="rounded-xl border border-black bg-black px-4 py-3 text-white transition hover:bg-white hover:text-black"
        >
          +
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {state.currentMissions.map((mission, index) => (
          <Mission key={index} title={mission.title} />
        ))}
      </div>
    </div>
  );
}
