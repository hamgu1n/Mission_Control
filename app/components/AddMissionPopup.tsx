'use client';

import MissionInput from './MissionInput';
import { Mission } from '@/context/MissionContext';
import { X } from 'lucide-react';

interface AddMissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  editMission?: Mission;
  initialTitle?: string;
}

export default function AddMissionPopup({
  isOpen,
  onClose,
  editMission,
  initialTitle,
}: AddMissionPopupProps) {
  if (!isOpen) return null;

  const title = editMission ? 'Edit Mission' : 'Add Mission';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200/70 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-stone-100 hover:text-slate-600"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        <MissionInput
          onSuccess={onClose}
          onClose={onClose}
          editMission={editMission}
          quickAddTitle={initialTitle}
        />
      </div>
    </div>
  );
}
