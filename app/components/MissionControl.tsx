"use client"

import { useContext, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";

export default function MissionControl()  {
  const context = useContext(MissionContext);
  const [newTitle, setNewTitle] = useState("");

  if (!context) return null; // bad context. probably when component is outside MissionProvider or smth

  const { state, dispatch } = context;

  function handleAddMission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTitle.trim()) return;

    dispatch({
      type: "ADD_MISSION",
      payload: { title: newTitle.trim() }
    });

    setNewTitle("");
  }

  return (
    <div className="w-1/3 min-w-[320px] max-w-[450px] rounded-2xl border border-black bg-white p-6 shadow-sm">
      <form onSubmit={handleAddMission} className="mb-4 flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new mission"
          className="flex-1 rounded-xl border border-black px-4 py-3 text-black outline-none placeholder:text-black/50"
        />

        <button type="submit" className="rounded-xl border border-black bg-black px-4 py-3 text-white transition hover:bg-white hover:text-black">+</button>
      </form>

      <div className="flex flex-col gap-3">
        {state.currentTasks.map((mission, index) => (
          <Mission key={index} title={mission.title} />
        ))}
      </div>
    </div>
  );
}