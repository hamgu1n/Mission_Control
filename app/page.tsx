"use client"

import { useReducer } from "react";
import MissionControl from "./components/MissionControl";
import { MissionContext, missionReducer, initialState } from "@/context/MissionContext";

export default function Page() {

  const [state, dispatch] = useReducer(missionReducer, initialState);

  return (
    <MissionContext.Provider value= {{ state, dispatch }} >
      <MissionControl />
    </MissionContext.Provider>
  );
}
