"use client"

import { useContext, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";
import SearchBar from "./SearchBar";
import AddMissionPopup from "./AddMissionPopup";

export default function MissionControl() {
  const context = useContext(MissionContext);
  const [searchText, setSearchText] = useState("");
  const [showMissionPopup, setShowMissionPopup] = useState(false); // true if popup is visible

  if (!context) return null; // ensures component is inside MissionProvider

  const { state, dispatch } = context;

  // filter out missions depending on the searchText
  const filteredMissions = state.currentMissions.filter((mission) =>
    mission.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <div className="w-full max-w-md">

        <div className="mb-4 flex gap-2">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          <button
            type="button"
            onClick={() => setShowMissionPopup(true)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white text-lg font-light shadow-sm transition hover:bg-violet-600"
          >
            +
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto p-1 flex flex-col gap-2">
          {filteredMissions.map((mission, index) => (
            <Mission key={index} mission={mission} />
          ))}
        </div>
      </div>

      <>
        <AddMissionPopup
          isOpen={showMissionPopup}
          onClose={() => setShowMissionPopup(false)}
        />
      </>

    </>
  );
}
