"use client";

import { useState, useContext } from "react";
import { Settings, Funnel, PlusCircle } from "lucide-react";
import { MissionContext} from "@/context/MissionContext";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";
import IconButton from "./IconButton";


interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Mission Control" }: HeaderProps) {

  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error("Header must be used within a MissionProvider");
  }

  const { state, dispatch } = missionContext;

  const { showFilterMenu } = state;




  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-400 bg-white/80 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between gap-4"> {/* Added gap for spacing */}
          <h1 className="text-lg font-semibold tracking-tight text-slate-800">{title}</h1>


            <SearchBar /> {/* Render the context-aware SearchBar */}

          {/* Settings button on the far right */}
          <IconButton icon={Settings} onClick={() => { /* Handle settings click */ }} />
        </div>

      </header>
    );
  }
