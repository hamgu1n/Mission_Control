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
    <div className="app-input relative flex w-2/5 items-center">
      <input
        type="text"
        value={searchText}
        onChange={(e) =>
          dispatch({ type: 'SET_SEARCH_TEXT', payload: e.target.value })
        }
        placeholder="Search missions"
        className="text-primary placeholder:text-muted flex-1 bg-transparent pr-8 text-sm outline-none"
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
