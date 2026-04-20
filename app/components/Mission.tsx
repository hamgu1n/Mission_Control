'use client';

import { useState, useContext } from 'react';
import {
  Mission as MissionType,
  MissionContext,
} from '@/context/MissionContext';
import { getCurrentDateTime } from '@/app/helpers/getCurrentTime';
import Tag from './Tag';
import {
  Calendar,
  Clock,
  Trash2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Target,
  Link,
  Flag,
  Pencil,
} from 'lucide-react';
import AddMissionPopup from './AddMissionPopup';
import IconButton from './IconButton';
import isPastDue from '../helpers/isPastDue';

interface MissionProps {
  mission: MissionType;
}

const priorityConfig = {
  high: { color: 'text-red-500', label: 'High' },
  medium: { color: 'text-yellow-500', label: 'Med' },
  low: { color: 'text-green-500', label: 'Low' },
};

export default function Mission({ mission }: MissionProps) {
  const [expanded, setExpanded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const delContext = useContext(MissionContext);
  if (!delContext) return null;

  const { dispatch } = delContext;

  const done = mission.tags?.some((tag) => tag.name === 'Done');

  if (done) return null;

  const dateTag = mission.tags?.find((tag) => tag.type === 'date');
  const timeTag = mission.tags?.find((tag) => tag.type === 'time');
  const statusTag = mission.tags?.find((tag) => tag.type === 'status');
  const labelTags = mission.tags?.filter((tag) => tag.type === 'label') || [];

  const pastDue = isPastDue({
    date: dateTag?.name,
    time: timeTag?.name,
  });

  function deleteMission() {
    dispatch({
      type: 'DELETE_MISSION',
      payload: mission,
    });
  }

  return (
    <div className="flex w-full items-center">
      <div className="app-card flex w-full flex-col px-4 py-3.5 transition hover:shadow-md">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              {statusTag && <Tag tag={statusTag} />}
              <p className="text-primary truncate text-sm font-semibold">
                {mission.title}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-1">
            <IconButton
              icon={expanded ? ChevronUp : ChevronDown}
              onClick={() => setExpanded((p) => !p)}
            />
            <IconButton
              icon={CheckCircle2}
              onClick={() =>
                dispatch({
                  type: 'MARK_DONE',
                  payload: mission,
                  timestamp: getCurrentDateTime(),
                })
              }
              hoverColor="green"
            />
            <IconButton
              icon={Pencil}
              onClick={() => setShowEdit(true)}
              hoverColor="blue"
            />
            <IconButton
              icon={Trash2}
              onClick={deleteMission}
              hoverColor="red"
            />
          </div>
        </div>

        {/* Meta */}
        {(dateTag || timeTag || mission.priority) && (
          <div className="text-secondary mt-2 flex items-center gap-3 text-xs">
            {dateTag && (
              <span
                className={`flex items-center gap-1 ${pastDue ? 'text-red-500' : ''}`}
              >
                <Calendar className="h-3 w-3" />
                {dateTag.name}
              </span>
            )}

            {timeTag && (
              <span
                className={`flex items-center gap-1 ${pastDue ? 'text-red-500' : ''}`}
              >
                <Clock className="h-3 w-3" />
                {timeTag.name}
              </span>
            )}

            {mission.priority && (
              <span
                className={`flex items-center gap-1 ${priorityConfig[mission.priority].color}`}
              >
                <Flag className="h-3 w-3" />
                {priorityConfig[mission.priority].label}
              </span>
            )}
          </div>
        )}

        {/* Expanded */}
        {expanded && (
          <div className="mt-3 flex flex-col gap-2 border-t border-(--app-border) pt-3">
            {labelTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {labelTags.map((tag) => (
                  <Tag key={tag.name} tag={tag} />
                ))}
              </div>
            )}

            {mission.description ? (
              <p className="text-secondary text-xs leading-relaxed whitespace-pre-wrap">
                {mission.description}
              </p>
            ) : (
              <p className="text-muted text-xs italic">No description</p>
            )}

            {Array.isArray(mission.goals) && mission.goals.length > 0 && (
              <div>
                <p className="text-secondary mb-1 flex items-center gap-1 text-xs font-medium">
                  <Target className="h-3 w-3" /> Goals
                </p>
                <ul className="text-secondary list-inside list-disc space-y-0.5 text-xs">
                  {mission.goals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            {Array.isArray(mission.resources) &&
              mission.resources.length > 0 && (
                <div>
                  <p className="text-secondary mb-1 flex items-center gap-1 text-xs font-medium">
                    <Link className="h-3 w-3" /> Resources
                  </p>
                  <ul className="space-y-0.5 text-xs">
                    {mission.resources.map((resource, i) => {
                      const isUrl =
                        /^(https?:\/\/)?[\w.-]+\.\w{2,}(\/\S*)?$/i.test(
                          resource
                        );

                      return (
                        <li
                          key={i}
                          className={
                            isUrl ? 'text-primary' : 'text-secondary'
                          }
                        >
                          {isUrl ? (
                            <a
                              href={
                                resource.match(/^https?:\/\//)
                                  ? resource
                                  : `https://${resource}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all hover:underline"
                            >
                              {resource}
                            </a>
                          ) : (
                            <span className="break-all">{resource}</span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
          </div>
        )}
      </div>

      <AddMissionPopup
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        editMission={mission}
      />
    </div>
  );
}
