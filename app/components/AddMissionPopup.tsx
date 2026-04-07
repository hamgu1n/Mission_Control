"use client"

import MissionInput from "./MissionInput";
import { Mission, MissionContext } from "@/context/MissionContext";
import { X } from "lucide-react";
import { useContext } from "react";

interface AddMissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  editMission?: Mission;
  quickAddTitle?: string;
}

export default function AddMissionPopup({ isOpen, onClose, editMission, quickAddTitle }: AddMissionPopupProps) {
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
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <MissionInput onSuccess={onClose} onClose={onClose} editMission={editMission} quickAddTitle={quickAddTitle} />
      </div>
    </div>
  );
}
