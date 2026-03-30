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
      <div className="w-full max-w-xl mx-auto rounded-2xl border border-black bg-white p-6 shadow-sm">

        <div className="mb-4 flex gap-2">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          <button
            type="button"
            onClick={() => setShowMissionPopup(true)}
            className="w-12 h-12 flex items-center justify-center rounded-xl border border-black bg-black text-white transition hover:bg-white hover:text-black p-0 shrink-0"
          >
            +
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-1 flex flex-col gap-3">
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
