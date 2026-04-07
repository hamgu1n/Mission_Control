"use client";

import { useState, useContext } from "react";
import { Settings, Funnel, PlusCircle } from "lucide-react";
import { MissionContext } from "@/context/MissionContext";
import SearchBar from "./SearchBar";
import FilterMenu from "./FilterMenu";
import IconButton from "./IconButton";


interface HeaderProps {
  title?: string;
}

export default function Header({ title = "Mission Control" }: HeaderProps) {


  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-400 bg-white/80 backdrop-blur-xl px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold tracking-tight text-slate-800">{title}</h1>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-stone-100 hover:text-slate-600"
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
