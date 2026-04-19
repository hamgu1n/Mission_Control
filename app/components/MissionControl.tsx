'use client';

import { useContext, useEffect, useState } from 'react';
import { MissionContext } from '@/context/MissionContext';
import Mission from './Mission';
import FilterMenu from './FilterMenu';
import AddMissionPopup from './AddMissionPopup';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function MissionControl() {
  const context = useContext(MissionContext);

  const [showMissionPopup, setShowMissionPopup] = useState(false);
  const [quickAddTitle, setQuickAddTitle] = useState('');

  const [collapsed, setCollapsed] = useState(false);

  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showMissions, setShowMissions] = useState(true);

  useEffect(() => {
    if (collapsed) {
      setShowMissions(false);

      const timer = setTimeout(() => setShowSearchBar(false), 300);
      return () => clearTimeout(timer);
    } else {
      setShowSearchBar(true);

      const timer = setTimeout(() => setShowMissions(true), 300);
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  if (!context) return null;

  const { state, dispatch } = context;
  const { currentFilterLogic, currentFilters, searchText, showFilterMenu } =
    state;

  const filteredMissions = state.currentMissions.filter((mission) => {
    const matchesSearchText = mission.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    if (!matchesSearchText) return false;

    if (currentFilters.length === 0) return true;

    const missionTagNames = new Set(mission.tags?.map((tag) => tag.name) || []);

    if (currentFilterLogic === 'AND') {
      return currentFilters.every((tag) => missionTagNames.has(tag.name));
    }

    return currentFilters.some((tag) => missionTagNames.has(tag.name));
  });

  const inputTextAndAddButtonRow = (
    <div
      className={`mb-4 flex min-h-10.5 items-center justify-end gap-2 ${
        !showSearchBar ? 'justify-center' : ''
      }`}
    >
      <input
        type="text"
        value={quickAddTitle}
        onChange={(e) => setQuickAddTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && quickAddTitle.trim() !== '') {
            setShowMissionPopup(true);
          }
        }}
        placeholder="New mission..."
        className={`app-input transition-all duration-300 ease-in-out ${
          collapsed ? 'w-0 overflow-hidden opacity-0' : 'w-full opacity-100'
        }`}
      />

      <button
        type="button"
        onClick={() => setShowMissionPopup(true)}
        className="btn-primary"
      >
        <Plus className="h-5 w-5" />
      </button>
    </div>
  );

  const missionList = (
    <div
      className={`flex flex-1 flex-col gap-2 overflow-y-auto p-1 ${
        !showMissions ? 'hidden' : ''
      }`}
    >
      {filteredMissions.map((mission, index) => (
        <Mission key={index} mission={mission} />
      ))}
    </div>
  );

  const toggleButton = (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className={`app-card text-muted absolute top-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-300 ease-in-out hover:bg-stone-50 hover:text-slate-600 ${
        collapsed ? 'left-17' : 'left-100'
      }`}
    >
      {collapsed ? (
        <ChevronRight className="h-4 w-4" />
      ) : (
        <ChevronLeft className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <>
      <div className="relative flex">
        <div
          className={`app-card relative h-[calc(100vh-57px)] overflow-hidden rounded-none border-0 border-r transition-all duration-300 ease-in-out ${
            collapsed ? 'w-17' : 'w-100'
          }`}
        >
          <div className="flex h-full flex-col p-4">
            {inputTextAndAddButtonRow}
            {missionList}
          </div>
        </div>

        {toggleButton}
      </div>

      <AddMissionPopup
        isOpen={showMissionPopup}
        onClose={() => {
          setShowMissionPopup(false);
          setQuickAddTitle('');
        }}
        initialTitle={quickAddTitle}
      />

      {showFilterMenu && (
        <FilterMenu
          onClose={() =>
            dispatch({ type: 'TOGGLE_FILTER_MENU', payload: false })
          }
        />
      )}
    </>
  );
}
