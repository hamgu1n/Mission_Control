"use client";

import { useContext, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import type { EventInput } from "@fullcalendar/core";
import { MissionContext } from "@/context/MissionContext";

export default function Calender() {
  const context = useContext(MissionContext);
  const missions = context?.state.currentMissions ?? [];

  const datedMissions = useMemo<EventInput[]>(() => {
    return missions.flatMap((mission) => {
      const dateTag = mission.tags?.find((tag) => tag.type === "date");
      const timeTag = mission.tags?.find((tag) => tag.type === "time");
      const isDone = mission.tags?.some((tag) => tag.type === "status" && tag.name === "Done");

      if (!dateTag || isDone) return [];

      return [
        {
          title: mission.title,
          start: timeTag?.name ? `${dateTag.name}T${timeTag.name}` : dateTag.name,
          allDay: !timeTag?.name,
        },
      ];
    });
  }, [missions]);

  return (
    <section className="app-card flex h-full min-h-[calc(100vh-121px)] flex-col overflow-hidden">
      <div className="flex-1 px-4 py-4">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "dayGridMonth,dayGridWeek",
          }}
          buttonText={{
            month: "Monthly",
            week: "Weekly",
          }}
          events={datedMissions}
          fixedWeekCount={false}
          dayMaxEventRows={2}
          height="100%"
        />
      </div>
    </section>
  );
}
