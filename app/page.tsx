"use client"

import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <main className="min-h-screen p-8">
      <MissionProvider>
          <MissionControl/>
      </MissionProvider>
    </main>
  );
}