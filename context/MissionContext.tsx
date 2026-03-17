"use client"
import { createContext, useReducer, useState, useEffect, ReactNode } from "react"

// Defines the structure of a mission - Can add to this for tags, statuses, etc.
interface  Mission {
  title: string
}

// Defines the structure of a mission action - this will contain add, delete, completions etc.
type MissionAction =
  | { type: "SET_MISSIONS"; payload: Mission[] } // replaces the full mission list, used when loading saved missions
  | { type: "ADD_MISSION"; payload: Mission }    // add a single new mission

// Defines the state structure for the application
interface MissionStateType {
  currentMissions: Mission[] // all missions the user currently has
}

// Defines the structure of the context of the application
interface MissionContextType {
  state: MissionStateType
  dispatch: React.Dispatch<MissionAction>;
}

// Declares context for the application
export const MissionContext = createContext<MissionContextType | null>(null);

// Declares the default initial state of the application before saved missions are loaded
export const initialState : MissionStateType  = {
  currentMissions: []
}

// Declares the reducer for the application
// Parameters:
//  - state: The current state of the application
//  - action: The action acting on the state
export const missionReducer = (state: MissionStateType, action: MissionAction) => {
  switch (action.type) {

    case "ADD_MISSION":
      return {
        ...state,
        currentMissions: [...state.currentMissions, action.payload]
      }

    case "SET_MISSIONS":
      return {
        ...state,
        currentMissions: action.payload
      }

    default:
      return state
  }
}

// Provides the mission state and dispatch function to all child components.
// Loads saved missions from localStorage at startup.
// Keeps localStorage updated whenever the mission list changes.
export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(missionReducer, initialState)

  // flag for whether startups missions have been loaded
  // prevents weird race conditions between loading and saving missions at startup
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => { // runs once at startup
    const savedMissions = localStorage.getItem("missions")

    if (savedMissions) {
      dispatch({             // overwrite with loaded list
        type: "SET_MISSIONS",
        payload: JSON.parse(savedMissions)
      })
    }

    setHasLoaded(true);
  }, [])

  useEffect(() => { // runs whenever state.currentMissions is updated

    if (!hasLoaded) return;  // prevents running on first render, before the startup missions are loaded.

    localStorage.setItem("missions", JSON.stringify(state.currentMissions))
  }, [state.currentMissions, hasLoaded])

  return (
    <MissionContext.Provider value={{ state, dispatch }}>
      {children}
    </MissionContext.Provider>
  )
}
