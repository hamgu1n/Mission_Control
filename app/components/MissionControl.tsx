"use client"

import { useContext } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";
import MissionInput from "./MissionInput";

export default function MissionControl() {
  const context = useContext(MissionContext);

  if (!context) return null; // ensures component is inside MissionProvider

  const { state, dispatch } = context;

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-black bg-white p-6 shadow-sm">

      <MissionInput/>

      <div className="flex flex-col gap-3">
        {state.currentMissions.map((mission, index) => (
          <Mission key={index} mission={mission} />
        ))}
      </div>
    </div>
  );
}
