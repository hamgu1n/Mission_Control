"use client"
import { useState } from "react";
import { Mission as MissionType, MissionContext } from "@/context/MissionContext";
import { getCurrentDateTime } from "@/app/helpers/getCurrentTime";
import { useContext } from "react";
import Tag from "./Tag";
import { Calendar, Clock, Trash2, CheckCircle2, ChevronDown, ChevronUp, Target, Link, Flag, Pencil } from "lucide-react";
import AddMissionPopup from "./AddMissionPopup";

interface MissionProps {
  mission: MissionType;
}

export default function Mission({ mission }: MissionProps) {
  const [expanded, setExpanded] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const done = mission.tags?.some(tag => tag.name === "Done");

  const delContext = useContext(MissionContext);
  if (!delContext) return null;

  const { dispatch } = delContext;

  function deleteMission() {
    dispatch({
      type: "DELETE_MISSION",
      payload: mission
    });
  }

  const dateTag = mission.tags?.find(tag => tag.type === "date");
  const timeTag = mission.tags?.find(tag => tag.type === "time");
  const statusTag = mission.tags?.find(tag => tag.type === "status");
  const labelTags = mission.tags?.filter(tag => tag.type === "label") || [];

  const priorityConfig = {
    high: { color: "text-red-500", label: "High" },
    medium: { color: "text-yellow-500", label: "Med" },
    low: { color: "text-green-500", label: "Low" },
  };

  return (
    <div className={`flex items-center w-full ${done ? "hidden" : ""}`}>
      <div className="flex flex-col w-full px-4 py-3.5 rounded-xl bg-white shadow-sm border border-stone-300 hover:shadow-md transition">

        {/* Top row: status + title */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {statusTag && <Tag tag={statusTag} />}
              <p className="text-sm font-semibold text-slate-800 truncate">
                {mission.title}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setExpanded(prev => !prev)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-stone-100 transition"
            >
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            <button
              type="button"
              onClick={() => dispatch({
                type: "MARK_DONE",
                payload: mission,
                timestamp: getCurrentDateTime()
              })}
              className="p-1.5 rounded-lg text-slate-400 hover:text-green-500 hover:bg-green-50 transition"
            >
              <CheckCircle2 className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowEdit(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-violet-500 hover:bg-violet-50 transition"
            >
              <Pencil className="h-4 w-4" />
            </button>

            <button
              onClick={deleteMission}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Date/time/priority row - always visible if present */}
        {(dateTag || timeTag || mission.priority) && (
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            {dateTag && (
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {dateTag.name}
              </span>
            )}
            {timeTag && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeTag.name}
              </span>
            )}
            {mission.priority && (
              <span className={`flex items-center gap-1 ${priorityConfig[mission.priority].color}`}>
                <Flag className="h-3 w-3" />
                {priorityConfig[mission.priority].label}
              </span>
            )}
          </div>
        )}

        {/* Expanded section: description + tags */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-stone-200 flex flex-col gap-2">
            {labelTags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {labelTags.map((tag, index) => (
                  <Tag key={index} tag={tag} />
                ))}
              </div>
            )}

            {mission.description ? (
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
                {mission.description}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic">No description</p>
            )}

            {mission.goals && mission.goals.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                  <Target className="h-3 w-3" /> Goals
                </p>
                <ul className="list-disc list-inside text-xs text-slate-600 space-y-0.5">
                  {mission.goals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
            )}

            {mission.resources && mission.resources.length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1 mb-1">
                  <Link className="h-3 w-3" /> Resources
                </p>
                <ul className="text-xs text-violet-500 space-y-0.5">
                  {mission.resources.map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                        {url}
                      </a>
                    </li>
                  ))}
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
  )
}
