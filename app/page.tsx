"use client";

import Header from "./components/Header";
import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Header title="Mission Control" />

      <div className="px-8 py-8">
        <MissionProvider>
          <MissionControl />
        </MissionProvider>
      </div>
    </main>
  );
}
