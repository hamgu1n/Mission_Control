"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calender() {
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
          events={[]}
          fixedWeekCount={false}
          dayMaxEventRows={2}
          height="100%"
        />
      </div>
    </section>
  );
}
