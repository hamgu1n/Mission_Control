"use client"

import React, { useContext, useMemo, useState } from "react";
import { MissionContext, Tag } from "@/context/MissionContext";
import isTagActive from "../helpers/isTagActive"; // Assuming you have these helpers
import areTagsEqual from "../helpers/areTagsEqual"; // Assuming you have these helpers
import IconButton from "./IconButton"; // Import IconButton
import { X } from "lucide-react"; // Import X icon from lucide-react

interface FilterMenuProps {
  onClose: () => void; // Made onClose required, as discussed
}

export default function FilterMenu({ onClose }: FilterMenuProps) {
  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error("FilterMenu must be used within a MissionProvider");
  }

  const { state, dispatch } = missionContext;
  // Destructuring using your preferred variable name: currentFilters
  const { currentMissions, currentFilters: currentFilters, currentFilterLogic: currentFilterLogic } = state;


  // creates arrays for each user-relevant tag type to later seperate in ui
  const { labelTags, statusTags, dateTags, timeTags } = useMemo(() => {
    const allTags = new Map<string, Tag>();
    currentMissions.forEach((mission) => {
      mission.tags?.forEach((tag) => {
        if (!allTags.has(tag.name)) {
          allTags.set(tag.name, tag);
        }
      })
    })

    const uniqueTags = Array.from(allTags.values());

    const labelTagsArray: Tag[] = [];
    const statusTagsArray: Tag[] = [];
    const dateTagsArray: Tag[] = [];
    const timeTagsArray: Tag[] = [];

    // sorts unique tags into each tag type array
    uniqueTags.forEach((tag) => {
      switch (tag.type) {
        case "label":
          labelTagsArray.push(tag);
          break;
        case "status":
          statusTagsArray.push(tag);
          break;
        case "date":
          dateTagsArray.push(tag);
          break;
        case "time":
          timeTagsArray.push(tag)
          break;
        default:
          // Treat untyped tags as labels by default, matching typical use cases
          if (!tag.type) {
             labelTagsArray.push(tag);
          }
          break;
      }
    });

    return { labelTags: labelTagsArray, statusTags: statusTagsArray, dateTags: dateTagsArray, timeTags: timeTagsArray };
  }, [currentMissions]);

  //adds or removes a tag from the filter array when changed
  const toggleTag = (tagToToggle: Tag) => {
    let newFilters: Tag[];
    if (isTagActive(tagToToggle, currentFilters)) {
      newFilters = currentFilters.filter((tag) => !areTagsEqual(tag, tagToToggle));
    } else {
      newFilters = [...currentFilters, tagToToggle];
    }
    dispatch({ type: "SET_FILTERS", payload: newFilters });
  };

  const setLogic = (logic: "AND" | "OR") => {
    dispatch({ type: "SET_FILTER_LOGIC", payload: logic })
  };

  // Placeholder for internal state for the label text input for suggestions
  const [labelSearchTerm, setLabelSearchTerm] = useState("");
  // Placeholder for internal state for selected status tag from dropdown
  const [selectedStatusTag, setSelectedStatusTag] = useState<Tag | null>(null);
  // Placeholder for internal state for date range
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/25 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200/70 bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">Filter Missions</h2>
          <IconButton icon={X} onClick={onClose} /> {/* Using your IconButton component */}
        </div>

        {/* Filter Logic (AND/OR) */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Filter Logic:
          </label>
          <div className="flex gap-2 p-1.5 rounded-xl border border-stone-300 bg-white shadow-sm"> {/* Grouping for radio buttons */}
            <label className={`flex-1 flex items-center justify-center cursor-pointer rounded-lg text-sm transition-colors ${
              currentFilterLogic === "AND"
                ? "bg-violet-500 text-white"
                : "text-slate-500 hover:bg-stone-100"
            }`}>
              <input
                type="radio"
                name="filterLogic"
                value="AND"
                checked={currentFilterLogic === "AND"}
                onChange={() => setLogic("AND")}
                className="sr-only" // Hide native radio button visually
              />
              <span className="py-2 px-3">AND (Intersect)</span>
            </label>
            <label className={`flex-1 flex items-center justify-center cursor-pointer rounded-lg text-sm transition-colors ${
              currentFilterLogic === "OR"
                ? "bg-violet-500 text-white"
                : "text-slate-500 hover:bg-stone-100"
            }`}>
              <input
                type="radio"
                name="filterLogic"
                value="OR"
                checked={currentFilterLogic === "OR"}
                onChange={() => setLogic("OR")}
                className="sr-only" // Hide native radio button visually
              />
              <span className="py-2 px-3">OR (Union)</span>
            </label>
          </div>
        </div>

        {/* Label Tags (Text box with suggestions) - Placeholder */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Label Tags:
          </label>
          {/* For now, let's just show clickable label tags with updated styling. */}
          <div className="flex flex-wrap gap-2">
            {labelTags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                  isTagActive(tag, currentFilters) // Using currentFilters here
                    ? (tag.color || "bg-blue-500") + " text-white" // Keep tag's original color if active
                    : "bg-stone-100 text-slate-600 hover:bg-stone-200" // New style for inactive
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
          {/* Future: <input type="text" placeholder="Search label tags..." value={labelSearchTerm} onChange={(e) => setLabelSearchTerm(e.target.value)} className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100" /> */}
          {/* Future: Display suggested tags based on labelSearchTerm */}
        </div>

        {/* Status Tags (Dropdown) - Placeholder */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Status Tags:
          </label>
          <select
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none placeholder:text-slate-400 transition focus:border-violet-300 focus:ring-2 focus:ring-violet-100 appearance-none pr-8" // Added appearance-none and pr-8
            value={selectedStatusTag?.name || ""}
            onChange={(e) => {
              const selectedName = e.target.value;
              const tag = statusTags.find(t => t.name === selectedName);
              if (selectedName === "") {
                const nonStatusFilters = currentFilters.filter(f => f.type !== "status"); // Using currentFilters here
                dispatch({ type: "SET_FILTERS", payload: nonStatusFilters });
                setSelectedStatusTag(null);
              } else if (tag) {
                const newFilters = currentFilters.filter(f => f.type !== "status"); // Remove any existing status filters. Using currentFilters here.
                newFilters.push(tag);
                dispatch({ type: "SET_FILTERS", payload: newFilters });
                setSelectedStatusTag(tag);
              }
            }}
          >
            <option value="">-- Select Status --</option>
            {statusTags.map((tag) => (
              <option key={tag.name} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date Time Frame (Input) - Placeholder */}
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Due Date Range:
          </label>
          <div className="w-full flex justify-start gap-4 rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-slate-800 shadow-sm outline-none">
            <input
              type="date"
              className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" // Inherit styling from parent, make transparent
              placeholder="Start Date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({ ...dateRange, startDate: e.target.value })}
            />
            <input
              type="date"
              className="flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400" // Inherit styling from parent, make transparent
              placeholder="End Date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({ ...dateRange, endDate: e.target.value })}
            />
          </div>
          {/* Future: Add logic to process dateRange and dispatch appropriate date tags */}
        </div>
      </div>
    </div>
  );
}
