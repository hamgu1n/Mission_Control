'use client';

import React, { useContext, useState } from 'react';
import { MissionContext, Tag } from '../../context/MissionContext';
import IconButton from './IconButton';
import { X } from 'lucide-react';

import { useGroupedTags } from '../hooks/useGroupTags';
import { useFilterActions } from '../hooks/useFilterActions';
import { isTagActive } from '../helpers/filterTags';
import { colorMap } from './Tag';

interface FilterMenuProps {
  onClose: () => void;
}

export default function FilterMenu({ onClose }: FilterMenuProps) {
  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error('FilterMenu must be used within a MissionProvider');
  }

  const { state, dispatch } = missionContext;
  const { currentMissions, currentFilters, currentFilterLogic } = state;

  const { labelTags, statusTags } = useGroupedTags(currentMissions);

  const { toggleTag, setLogic, setStatus } = useFilterActions(
    dispatch,
    currentFilters
  );

  const [selectedStatusTag, setSelectedStatusTag] = useState<Tag | null>(null);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-(--app-overlay) px-4 backdrop-blur-sm">
      <div className="app-card w-full max-w-xl p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-primary text-lg font-semibold">
            Filter Missions
          </h2>

          <IconButton icon={X} onClick={onClose} />
        </div>

        {/* Filter Logic */}
        <div className="mb-4">
          <label className="text-secondary mb-1 block text-xs font-medium">
            Filter Logic:
          </label>

          <div className="flex gap-2 rounded-xl border border-(--input-border) bg-(--input-bg) p-1.5 shadow-sm">
            {(['AND', 'OR'] as const).map((logic) => (
              <label
                key={logic}
                className={`flex flex-1 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${
                  currentFilterLogic === logic
                    ? 'bg-(--app-btn-primary-bg) text-(--app-btn-primary-text)'
                    : 'text-secondary hover:bg-(--btn-icon-hover-bg)'
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  checked={currentFilterLogic === logic}
                  onChange={() => setLogic(logic)}
                />
                <span className="px-3 py-2">{logic}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Label Tags */}
        <div className="mb-4">
          <label className="text-secondary mb-1 block text-xs font-medium">
            Label Tags:
          </label>

          <div className="flex flex-wrap gap-2">
            {labelTags.map((tag) => {
              const active = isTagActive(tag, currentFilters);

              return (
                <button
                  key={tag.name}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    active
                      ? colorMap[tag.color] || 'tag-none'
                      : 'tag-none hover:bg-(--btn-icon-hover-bg)'
                  }`}
                >
                  {tag.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Status Tags */}
        <div className="mb-4">
          <label className="text-secondary mb-1 block text-xs font-medium">
            Status Tags:
          </label>

          <select
            className="app-input w-full appearance-none"
            value={selectedStatusTag?.name || ''}
            onChange={(e) => {
              const tag = statusTags.find((t) => t.name === e.target.value);
              const selected = e.target.value ? (tag ?? null) : null;

              setSelectedStatusTag(selected);
              setStatus(selected);
            }}
          >
            <option value="">-- Select Status --</option>
            {statusTags.map((tag) => (
              <option key={tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
