"use client"

import { useState, useContext } from "react";
import { MissionContext, Mission, Tag } from "@/context/MissionContext";
import ListInput from "./ListInput";
import { Tag as TagIcon } from "lucide-react";
import ButtonRow from "./ButtonRow";

const tagColors = [
  "bg-red-400",
  "bg-yellow-400",
  "bg-green-400",
  "bg-blue-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-amber-400",
  "bg-teal-400",
  "bg-orange-400",
  "bg-violet-400",
]

interface MissionInputProps {
  onSuccess?: () => void;
  onClose?: () => void;
  editMission?: Mission;
  quickAddTitle?: string;
}

export default function MissionInput({ onSuccess, onClose, editMission, quickAddTitle }: MissionInputProps) {
  const context = useContext(MissionContext);
  const [newTitle, setNewTitle] = useState(editMission?.title || quickAddTitle || "");
  const [newDescription, setNewDescription] = useState(editMission?.description || "");
  const [newPriority, setNewPriority] = useState<"high" | "medium" | "low" | "">(editMission?.priority || "");
  const [newGoals, setNewGoals] = useState<string[]>(editMission?.goals || []);
  const [newResources, setNewResources] = useState<string[]>(editMission?.resources || []);
  const [showTags, setShowTags] = useState(() => {
    const labels = editMission?.tags?.filter(t => t.type === "label") || [];
    return labels.length > 0;
  });
  const [newTags, setNewTags] = useState(() => {
    const labels = editMission?.tags?.filter(t => t.type === "label") || [];
    return labels.map(t => t.name).join(", ");
  });
  const [newDate, setNewDate] = useState(() => editMission?.tags?.find(t => t.type === "date")?.name || "");
  const [newTime, setNewTime] = useState(() => editMission?.tags?.find(t => t.type === "time")?.name || "");
  const [titleError, setTitleError] = useState(false);

  if (!context) return null; // component outside MissionProvider

  const { dispatch } = context;

  function handleAddMission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTitle.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);

    const goalsArray = newGoals.map(g => g.trim()).filter(Boolean);
    const resourcesArray = newResources.map(r => r.trim()).filter(Boolean);

    const existingStatus = editMission?.tags?.find(t => t.type === "status");
    const tagsArray: Tag[] = [
      existingStatus || { name: "New", color: "bg-blue-400", type: "status" as const },
      ...(newDate ? [{ name: newDate, color: "bg-slate-400", type: "date" as const }] : []),
      // Conditionally add time tag
      ...(newTime ? [{ name: newTime, color: "bg-slate-400", type: "time" as const }] : []),
      ...newTags
        .split(",")
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(tag => ({
          name: tag,
          color: tagColors[Math.floor(Math.random() * tagColors.length)],
          type: "label" as const
        }))
    ];

    const newMission: Mission = {
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      priority: newPriority || undefined,
      goals: goalsArray.length > 0 ? goalsArray : undefined,
      resources: resourcesArray.length > 0 ? resourcesArray : undefined,
      tags: tagsArray
    };

    if (editMission) {
      dispatch({
        type: "EDIT_MISSION",
        payload: { original: editMission, updated: newMission }
      });
    } else {
      dispatch({
        type: "ADD_MISSION",
        payload: newMission
      });
    }

    setNewTitle("");
    setNewDescription("");
    setNewPriority("");
    setNewGoals([]);
    setNewResources([]);
    setNewTags("");
    setNewDate("");
    setNewTime("");

    onSuccess?.();
  }


  return (
    <form onSubmit={handleAddMission} className="mb-4 flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className={`block text-xs font-medium ${titleError ? "text-red-500" : "text-slate-500"}`}>Title <span className="text-red-400">*</span></label>
          {titleError && <span className="text-xs text-red-400">Title is required</span>}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => { setNewTitle(e.target.value); if (titleError) setTitleError(false); }}
            placeholder="Add a new mission"
            className={`flex-1 rounded-xl border bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition ${
              titleError
                ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
                : "border-stone-300 focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
            }`}
          />

          <button
            type="button"
            onClick={() => setShowTags(prev => !prev)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm border border-stone-300 transition hover:bg-stone-50 hover:text-slate-600"
          >
            <TagIcon className="w-[50%] h-[50%]" />
          </button>
        </div>
      </div>

      {showTags && (
        <div className="mb-2">
          <label className="block text-xs font-medium text-slate-500 mb-1">Tags</label>
          <input
            type="text"
            value={newTags}
            onChange={(e) => setNewTags(e.target.value)}
            placeholder="Add tags separated by a comma..."
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Description</label>
        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What is this mission about?"
          rows={3}
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100 resize-none"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Priority</label>
        <ButtonRow
          options={[
            { label: "Low", color: "green" },
            { label: "Medium", color: "yellow" },
            { label: "High", color: "red" },
          ]}
          selected={newPriority}
          onSelect={(v) => setNewPriority(v as "high" | "medium" | "low" | "")}
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Goals</label>
        <ListInput items={newGoals} setItems={setNewGoals} icon="-" addLabel="goal" placeholder="List your goals here..." />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Resources & Links</label>
        <ListInput items={newResources} setItems={setNewResources} icon=">" addLabel="link" placeholder="Drop your links here..." />
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-500 mb-1">Due Date & Time</label>
        <div className="w-full flex justify-start gap-6 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />

          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-stone-300 px-4 py-2 text-slate-500 transition hover:bg-stone-50 hover:text-slate-700"
        >
          Close
        </button>

        <button
          type="submit"
          className="rounded-xl bg-violet-500 px-4 py-2 text-white shadow-sm transition hover:bg-violet-600"
        >
          {editMission ? "Save" : "Done"}
        </button>
      </div>
    </form>
  );
}
