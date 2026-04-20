'use client';

import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import type {
  EventClickArg,
  EventContentArg,
  EventInput,
} from '@fullcalendar/core';
import { MissionContext, type Mission } from '@/context/MissionContext';
import AddMissionPopup from './AddMissionPopup';

type Priority = NonNullable<Mission['priority']>;

const priorityEventClasses: Record<Priority | 'none', string> = {
  high: 'priority-red',
  medium: 'priority-yellow',
  low: 'priority-green',
  none: 'priority-none',
};

function formatMissionTime(date: Date | null) {
  if (!date) return '';

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export default function Calender() {
  const missions = useContext(MissionContext)?.state.currentMissions;
  const calendarRef = useRef<FullCalendar | null>(null);
  const calendarFrameRef = useRef<HTMLDivElement | null>(null);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);

  useEffect(() => {
    const frame = calendarFrameRef.current;

    if (!frame) return;

    let animationFrameId: number | null = null;

    const resizeObserver = new ResizeObserver(() => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        calendarRef.current?.getApi().updateSize();
      });
    });

    resizeObserver.observe(frame);

    return () => {
      resizeObserver.disconnect();

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const datedMissions = useMemo<EventInput[]>(() => {
    return (missions ?? [])
      .map((m) => missionToEvent(m, priorityEventClasses))
      .filter(Boolean) as EventInput[];
  }, [missions]);

  function renderMissionEventContent(eventInfo: EventContentArg) {
    const isWeeklyView = eventInfo.view.type === 'dayGridWeek';
    const showWeeklyTime = isWeeklyView && !eventInfo.event.allDay;

    return (
      <div className="flex w-full flex-col items-center text-center leading-tight">
        {showWeeklyTime && (
          <div className="w-full text-[11px] font-medium">
            {formatMissionTime(eventInfo.event.start)}
          </div>
        )}
        <div className="w-full truncate text-[11px] font-medium">
          {eventInfo.event.title}
        </div>
      </div>
    );
  }

  function handleMissionEventClick(eventInfo: EventClickArg) {
    const mission = eventInfo.event.extendedProps.mission as
      | Mission
      | undefined;

    if (mission) {
      setEditingMission(mission);
    }
  }

  return (
    <>
      <section className="app-card flex h-full min-h-[calc(100vh-121px)] flex-col overflow-hidden">
        <div ref={calendarFrameRef} className="flex-1 px-4 py-4">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next',
              center: 'title',
              right: 'dayGridMonth,dayGridWeek',
            }}
            buttonText={{
              month: 'Monthly',
              week: 'Weekly',
            }}
            events={datedMissions}
            eventDisplay="block"
            eventContent={renderMissionEventContent}
            eventClick={handleMissionEventClick}
            defaultTimedEventDuration="00:01"
            fixedWeekCount={false}
            dayMaxEventRows={2}
            height="100%"
          />
        </div>
      </section>

      <AddMissionPopup
        isOpen={editingMission !== null}
        onClose={() => setEditingMission(null)}
        editMission={editingMission ?? undefined}
      />
    </>
  );
}

function missionToEvent(
  mission: Mission,
  priorityClasses: typeof priorityEventClasses
): EventInput | null {
  const dateTag = mission.tags?.find((tag) => tag.type === 'date');
  const timeTag = mission.tags?.find((tag) => tag.type === 'time');

  const isDone = mission.tags?.some(
    (tag) => tag.type === 'status' && tag.name === 'Done'
  );

  if (!dateTag || isDone) return null;

  const hasTime = !!timeTag?.name;

  return {
    title: mission.title,
    start: hasTime ? `${dateTag.name}T${timeTag.name}` : dateTag.name,
    allDay: !hasTime,
    extendedProps: { mission },
    classNames: ['cursor-pointer', priorityClasses[mission.priority ?? 'none']],
  };
}
