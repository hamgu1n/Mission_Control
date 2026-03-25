"use client"

import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <main className="flex justify-center items-center min-h-screen p-8">
      <div className="transform w-full translate-y-8">
        <MissionProvider>
          <MissionControl/>
        </MissionProvider>
      </div>
    </main>
  );
}
