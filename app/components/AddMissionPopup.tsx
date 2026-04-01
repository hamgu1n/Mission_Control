"use client"

import MissionInput from "./MissionInput";
import { Mission } from "@/context/MissionContext";

interface AddMissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  editMission?: Mission;
}

export default function AddMissionPopup({ isOpen, onClose, editMission }: AddMissionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200/70 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{editMission ? "Edit Mission" : "Add Mission"}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-stone-100 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        <MissionInput onSuccess={onClose} onClose={onClose} editMission={editMission} />
      </div>
    </div>
  );
}