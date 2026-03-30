"use client";

import Header from "./components/Header";
import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <MissionProvider>
      <main className="min-h-screen flex flex-col">
        <Header title="Mission Control" />

        <div className="flex flex-1 overflow-hidden">
          <MissionControl />

          {/* Main content area */}
          <div className="flex-1 px-8 py-8">
          </div>
        </div>
      </main>
    </MissionProvider>
  );
}
