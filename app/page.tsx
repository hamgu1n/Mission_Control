"use client";

import dynamic from "next/dynamic";
import Header from "./components/Header";
import MissionControl from "./components/MissionControl";
import { MissionProvider } from "@/context/MissionContext";
import { ThemeProvider } from "@/context/ThemeContext";

const Calendar = dynamic(() => import("./components/Calendar"), {
  ssr: false,
  loading: () => (
    <div className="app-card min-h-[calc(100vh-121px)] animate-pulse" />
  ),
});

export default function Page() {
  return (
    <ThemeProvider>
      <MissionProvider>
        <main className="app-bg min-h-screen flex flex-col">
          <Header title="Mission Control" />

          <div className="flex flex-1 overflow-hidden">
            <MissionControl />

            {/* Main content area */}
            <div className="flex-1 min-w-0 px-8 py-8">
              <Calendar />
            </div>
          </div>
        </main>
      </MissionProvider>
    </ThemeProvider>
  );
}
