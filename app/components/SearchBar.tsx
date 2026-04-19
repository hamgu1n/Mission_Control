'use client';

import { useContext } from 'react';
import { MissionContext } from '@/context/MissionContext';
import IconButton from './IconButton';
import { Funnel } from 'lucide-react';

export default function SearchBar() {
  const missionContext = useContext(MissionContext);

  if (!missionContext) {
    throw new Error('SearchBar must be used within a MissionProvider');
  }

  const { state, dispatch } = missionContext;
  const { searchText } = state;

  return (
    <div className="relative flex w-2/5 items-center rounded-xl border border-stone-300 bg-white px-4 py-2.5 shadow-sm transition focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
      <input
        type="text"
        value={searchText}
        onChange={(e) =>
          dispatch({ type: 'SET_SEARCH_TEXT', payload: e.target.value })
        }
        placeholder="Search missions"
        className="flex-1 bg-transparent pr-8 text-sm text-slate-800 outline-none placeholder:text-slate-400"
      />

      <div className="absolute top-1/2 right-2 -translate-y-1/2">
        <IconButton
          icon={Funnel}
          onClick={() =>
            dispatch({ type: 'TOGGLE_FILTER_MENU', payload: true })
          }
          hoverColor="blue"
        />
      </div>
    </div>
  );
}
