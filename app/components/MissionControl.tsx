"use client"

import { useContext, useEffect, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";
import AddMissionPopup from "./AddMissionPopup";
import { ChevronLeft, ChevronRight} from "lucide-react";

export default function MissionControl() {
  const context = useContext(MissionContext);

  const [showMissionPopup, setShowMissionPopup] = useState(false);

  const [collapsed, setCollapsed] = useState(false); // state for whether the sidebar is collapsed or not

  // animation states, for a smooth animation when collapsing the sidebar
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [showMissions, setShowMissions] = useState(true);

  useEffect(() => {
    if (collapsed) {
      setShowMissions(false); // hide missions instantly
      const timer = setTimeout(() => setShowSearchBar(false), 300); // hide search bar after animation
      return () => clearTimeout(timer);
    } else {
      setShowSearchBar(true); // show search bar instantly on expand
      const timer = setTimeout(() => setShowMissions(true), 300); // show missions after animation
      return () => clearTimeout(timer);
    }
  }, [collapsed]);

  if (!context) return null; // ensures component is inside MissionProvider

  const { state, dispatch } = context;
  const { currentFilterLogic, currentFilters, searchText } = state;

  // filter out missions depending on the searchText and on currentFilters by currentFilterLogic
  const filteredMissions = state.currentMissions.filter((mission) => {
      // 1. Filter by search text (always applied)
      const matchesSearchText = mission.title.toLowerCase().includes(searchText.toLowerCase());
      if (!matchesSearchText) {
        return false;
      }

      // 2. If no tags are selected in the filter, then all missions matching search text are included.
      if (currentFilters.length === 0) {
        return true;
      }

      // 3. Check for tag matches based on filterLogic (AND/OR)
      const missionTagNames = new Set(mission.tags?.map(tag => tag.name) || []);

      if (currentFilterLogic === "AND") {
        // For "AND" logic, the mission must have ALL selected filter tags.
        return currentFilters.every(filterTag => missionTagNames.has(filterTag.name));
      } else { // filterLogic === "OR"
        // For "OR" logic, the mission must have AT LEAST ONE selected filter tag.
        return currentFilters.some(filterTag => missionTagNames.has(filterTag.name));
      }
    });


  const inputTextAndAddButtonRow = ( // row with search bar and add button and filter button
    <div className={`mb-4 flex min-h-10.5 items-center justify-end ${!showSearchBar ? "justify-center" : ""}`}>
          <button
            type="button"
            onClick={() => setShowMissionPopup(true)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500 text-white text-base font-light shadow-sm transition hover:bg-violet-600"
          >
            +
          </button>
        </div>
  );

  const missionList = (
    <div className={`flex-1 overflow-y-auto p-1 flex flex-col gap-2 ${!showMissions ? "hidden" : ""}`}>
      {filteredMissions.map((mission, index) => (
        <Mission key={index} mission={mission} />
      ))}
    </div>
  );

  const toggleButton = (
    <button
      type="button"
      onClick={() => setCollapsed(!collapsed)}
      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 bg-white text-slate-400 shadow-md transition-all duration-300 ease-in-out hover:bg-stone-50 hover:text-slate-600 ${
        collapsed ? "left-17" : "left-80"
      }`}
    >
      {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </button>
  );

  return (
    <>
      <div className="relative flex">
        <div
          className={`relative h-[calc(100vh-57px)] bg-white border-r border-stone-300 shadow-sm transition-all duration-300 ease-in-out overflow-hidden ${
            collapsed ? "w-17" : "w-80"
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
        onClose={() => setShowMissionPopup(false)}
      />
    </>
  );
}
