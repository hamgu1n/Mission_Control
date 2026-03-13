"use client"

import { useContext } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";

export default function MissionControl()  {
  const context = useContext(MissionContext);

  if (!context) return null;

  const { state, dispatch } = context;

  return (
    <>
      <div> This will be where missions go </div>
      <Mission />
    </>
  )
}
