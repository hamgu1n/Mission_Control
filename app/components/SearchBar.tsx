"use client";

import { useContext } from "react";
import { MissionContext } from "@/context/MissionContext";

export default function SearchBar() {
  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error("SearchBar must be used within a MissionProvider");
  }

  const { state, dispatch } = missionContext;
  const { searchText } = state;


  return (
      <input
        type="text"
        value={searchText}
        // MODIFY onChange handler to use dispatch
        onChange={(e) => dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })}
        placeholder="Search missions"
        className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100"
      />
    );
}
