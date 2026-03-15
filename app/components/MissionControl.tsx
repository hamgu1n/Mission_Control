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
    <>
      <form onSubmit={handleAddMission}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter a mission"
        />

        <button type="submit">+</button>
      </form>

      <div>
        {state.currentTasks.map((mission, index) => (
          <Mission key={index} title={mission.title} />
        ))}
      </div>
    </>
  );
}