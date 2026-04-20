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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--app-overlay) px-4 backdrop-blur-sm">
      <div className="app-card w-full max-w-xl p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-primary text-lg font-semibold"> {title} </h2>
          <button type="button" onClick={onClose} className="btn-icon">
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
