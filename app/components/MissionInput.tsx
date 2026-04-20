'use client';

import { useState, useContext } from 'react';
import { MissionContext, Mission, Tag } from '@/context/MissionContext';
import ListInput from './ListInput';
import { Tag as TagIcon } from 'lucide-react';
import ButtonRow from './ButtonRow';
import { areTagsDistinct } from '../helpers/areTagsDistinct';

const tagColors = [
  'tag-red',
  'tag-yellow',
  'tag-green',
  'tag-blue',
  'tag-purple',
  'tag-pink',
  'tag-amber',
  'tag-teal',
  'tag-orange',
  'tag-violet',
];

interface MissionInputProps {
  onSuccess?: () => void;
  onClose?: () => void;
  editMission?: Mission;
  quickAddTitle?: string;
}

export default function MissionInput({
  onSuccess,
  onClose,
  editMission,
  quickAddTitle,
}: MissionInputProps) {
  const context = useContext(MissionContext);

  const [newTitle, setNewTitle] = useState(
    editMission?.title || quickAddTitle || ''
  );
  const [newDescription, setNewDescription] = useState(
    editMission?.description || ''
  );
  const [newPriority, setNewPriority] = useState<
    'high' | 'medium' | 'low' | ''
  >(editMission?.priority || '');

  const [newGoals, setNewGoals] = useState<string[]>(editMission?.goals || []);
  const [newResources, setNewResources] = useState<string[]>(
    editMission?.resources || []
  );

  const [showTags, setShowTags] = useState(() => {
    const labels = editMission?.tags?.filter((t) => t.type === 'label') || [];
    return labels.length > 0;
  });

  const [newTags, setNewTags] = useState(() => {
    const labels = editMission?.tags?.filter((t) => t.type === 'label') || [];
    return labels.map((t) => t.name).join(', ');
  });

  const [newDate, setNewDate] = useState(
    () => editMission?.tags?.find((t) => t.type === 'date')?.name || ''
  );

  const [newTime, setNewTime] = useState(
    () => editMission?.tags?.find((t) => t.type === 'time')?.name || ''
  );

  const [titleError, setTitleError] = useState(false);
  const [tagsError, setTagsError] = useState(false);

  if (!context) return null;

  const { dispatch } = context;

  function handleAddMission(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const labelTagNames = newTags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
    const hasTitleError = !newTitle.trim();
    const hasTagsError = !areTagsDistinct(labelTagNames);

    setTitleError(hasTitleError);
    setTagsError(hasTagsError);

    if (hasTagsError) setShowTags(true);

    if (hasTitleError || hasTagsError) {
      return;
    }

    const goalsArray = newGoals.map((g) => g.trim()).filter(Boolean);
    const resourcesArray = newResources.map((r) => r.trim()).filter(Boolean);

    const existingStatus = editMission?.tags?.find((t) => t.type === 'status');

    const tagsArray: Tag[] = [
      existingStatus || {
        name: 'New',
        color: 'tag-blue',
        type: 'status' as const,
      },
      ...(newDate
        ? [{ name: newDate, color: 'tag-slate', type: 'date' as const }]
        : []),
      ...(newTime
        ? [{ name: newTime, color: 'tag-slate', type: 'time' as const }]
        : []),
      ...labelTagNames.map((tag) => ({
        name: tag,
        color: tagColors[Math.floor(Math.random() * tagColors.length)],
        type: 'label' as const,
      })),
    ];

    const newMission: Mission = {
      title: newTitle.trim(),
      description: newDescription.trim() || undefined,
      priority: newPriority || undefined,
      goals: goalsArray.length > 0 ? goalsArray : undefined,
      resources: resourcesArray.length > 0 ? resourcesArray : undefined,
      tags: tagsArray,
    };

    if (editMission) {
      dispatch({
        type: 'EDIT_MISSION',
        payload: { original: editMission, updated: newMission },
      });
    } else {
      dispatch({
        type: 'ADD_MISSION',
        payload: newMission,
      });
    }

    setNewTitle('');
    setNewDescription('');
    setNewPriority('');
    setNewGoals([]);
    setNewResources([]);
    setNewTags('');
    setNewDate('');
    setNewTime('');
    setTagsError(false);

    onSuccess?.();
  }

  return (
    <form
      onSubmit={handleAddMission}
      className="mb-4 flex max-h-[70vh] flex-col gap-4 overflow-y-auto pr-4"
    >
      {/* Title */}
      <div>
        <div className="mb-1 flex items-center justify-between">
          <label
            className={`block text-xs font-medium ${
              titleError ? 'text-red-500' : "text-secondary"
            }`}
          >
            Title <span className="text-red-400">*</span>
          </label>

          {titleError && (
            <span className="text-xs text-red-400">Title is required</span>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
              if (titleError) setTitleError(false);
            }}
            placeholder="Add a new mission"
            className={`app-input flex-1 ${
              titleError
                ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                : ''
            }`}
          />

          <button
            type="button"
            onClick={() => setShowTags((p) => !p)}
            className="btn-primary"
          >
            <TagIcon className="h-5 w-6" />
          </button>
        </div>
      </div>

      {/* Tags */}
      {showTags && (
        <div className="mb-2">
          <div className="mb-1 flex items-center justify-between">
            <label
              className={`block text-xs font-medium ${
                tagsError ? 'text-red-500' : 'text-secondary'
              }`}
            >
              Tags
            </label>

            {tagsError && (
              <span className="text-xs text-red-400">
                Tags must be unique
              </span>
            )}
          </div>

          <input
            type="text"
            value={newTags}
            onChange={(e) => {
              setNewTags(e.target.value);
              if (tagsError) setTagsError(false);
            }}
            placeholder="Add tags separated by a comma..."
            className={`app-input w-full ${
              tagsError
                ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                : ''
            }`}
          />
        </div>
      )}

      {/* Description */}
      <div>
        <label className="text-secondary mb-1 block text-xs font-medium">
          Description
        </label>

        <textarea
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          placeholder="What is this mission about?"
          rows={3}
          className="app-input w-full resize-none"
        />
      </div>

      {/* Priority */}
      <div>
        <label className="text-secondary mb-1 block text-xs font-medium">
          Priority
        </label>

        <ButtonRow
          options={[
            { label: 'Low', color: 'green' },
            { label: 'Medium', color: 'yellow' },
            { label: 'High', color: 'red' },
          ]}
          selected={newPriority}
          onSelect={(v) => setNewPriority(v as 'high' | 'medium' | 'low' | '')}
        />
      </div>

      {/* Goals */}
      <div>
        <label className="text-secondary mb-1 block text-xs font-medium">
          Goals
        </label>

        <ListInput
          items={newGoals}
          setItems={setNewGoals}
          icon="-"
          addLabel="goal"
          placeholder="List your goals here..."
        />
      </div>

      {/* Resources */}
      <div>
        <label className="text-secondary mb-1 block text-xs font-medium">
          Resources & Links
        </label>

        <ListInput
          items={newResources}
          setItems={setNewResources}
          icon=">"
          addLabel="link"
          placeholder="Drop your links here..."
        />
      </div>

      {/* Date / Time */}
      <div>
        <label className="text-secondary mb-1 block text-xs font-medium">
          Due Date & Time
        </label>

        <div className="app-input flex w-full justify-start gap-6">
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="text-primary bg-transparent outline-none"
          />

          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="text-primary bg-transparent outline-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex justify-end gap-2">
        <button type="button" onClick={onClose} className="btn-secondary">
          Close
        </button>

        <button type="submit" className="btn-primary">
          {editMission ? 'Save' : 'Done'}
        </button>
      </div>
    </form>
  );
}
