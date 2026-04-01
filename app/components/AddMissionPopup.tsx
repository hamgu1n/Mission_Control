"use client"

import MissionInput from "./MissionInput";

interface AddMissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddMissionPopup({ isOpen, onClose }: AddMissionPopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200/70 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Add Mission</h2>
        </div>

        <MissionInput onSuccess={onClose} onClose={onClose} />
      </div>
    </div>
  );
}