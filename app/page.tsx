"use client"

import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <MissionProvider>
      <MissionControl />
    </MissionProvider>
  );
}