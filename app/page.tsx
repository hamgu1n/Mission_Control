"use client";

import Header from "./components/Header";
import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      <Header title="Mission Control" />

     <div className="w-full max-w-xl border border-black bg-white p-6 shadow-sm">
        <MissionProvider>
          <MissionControl />
        </MissionProvider>
      </div>
    </main>
  );
}
