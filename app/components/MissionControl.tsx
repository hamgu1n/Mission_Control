"use client"

import { useContext, useEffect, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";
import SearchBar from "./SearchBar";
import AddMissionPopup from "./AddMissionPopup";
import FilterMenu from "./FilterMenu";
import { ChevronLeft, ChevronRight, Funnel } from "lucide-react";

export default function MissionControl() {
  const context = useContext(MissionContext);
  const [searchText, setSearchText] = useState("");
  const [showMissionPopup, setShowMissionPopup] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);

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

  // filter out missions depending on the searchText
  const filteredMissions = state.currentMissions.filter((mission) =>
    mission.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const searchBarAndAddButtonRow = ( // row with search bar and add button and filter button
    <div className={`mb-4 flex min-h-10.5 items-center gap-2 ${!showSearchBar ? "justify-center" : ""}`}>
      <button
        type="button"
        onClick={() => setShowMissionPopup(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500 text-white text-base font-light shadow-sm transition hover:bg-violet-600"
      >
        +
      </button>

      {showSearchBar && (
        <div className="flex-1 min-w-0">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowFilterMenu(true)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-white text-base font-light shadow-sm transition hover:bg-blue-600"
        title="Filter Missions"
      > <Funnel className="h-5, w-5"></Funnel>
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
            {searchBarAndAddButtonRow}
            {missionList}
          </div>
        </div>

        {toggleButton}
      </div>

      <AddMissionPopup
        isOpen={showMissionPopup}
        onClose={() => setShowMissionPopup(false)}
      />
      {showFilterMenu && (
              <FilterMenu onClose={() => setShowFilterMenu(false)} />
            )}
    </>
  );
}
