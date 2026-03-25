"use client"

import { useContext, useState } from "react";
import { MissionContext } from "@/context/MissionContext";
import Mission from "./Mission";
import MissionInput from "./MissionInput";
import SearchBar from "./SearchBar";

export default function MissionControl() {
  const context = useContext(MissionContext);
  const [searchText, setSearchText] = useState("");

  if (!context) return null; // ensures component is inside MissionProvider

  const { state, dispatch } = context;

  // filter out missions depending on the searchText
  const filteredMissions = state.currentMissions.filter((mission) =>
    mission.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl border border-black bg-white p-6 shadow-sm">

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <MissionInput/>

      <div className="flex flex-col gap-3">
        {filteredMissions.map((mission, index) => (
          <Mission key={index} mission={mission} />
        ))}
      </div>
    </div>
  );
}
