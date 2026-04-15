"use client";

import { useContext } from "react";
import { MissionContext } from "@/context/MissionContext";
import IconButton from "./IconButton";
import { Funnel } from "lucide-react";

export default function SearchBar() {
  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error("SearchBar must be used within a MissionProvider");
  }

  const { state, dispatch } = missionContext;
  const { searchText, showFilterMenu } = state;

  return (
    <div
      className={`flex items-center relative w-2/5 rounded-xl border border-stone-300 bg-white px-4 py-2.5 shadow-sm outline-none transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100`}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) =>
          dispatch({ type: "SET_SEARCH_TEXT", payload: e.target.value })
        }
        placeholder="Search missions"
        className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400 pr-8"
      />

      {/* Filter Button positioned inside */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        {" "}
        {/* New div to position IconButton */}
        <IconButton
          icon={Funnel}
          onClick={() =>
            dispatch({ type: "TOGGLE_FILTER_MENU", payload: true })
          }
          hoverColor="blue"
        />
      </div>
    </div>
  );
}
