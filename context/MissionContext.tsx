"use client"
import { createContext, useReducer, ReactNode } from "react"

// Defines the structure of a mission - Can add to this for tags, statuses, etc.
interface  Mission {
  title: string
}

// Defines the structure of a mission action - this will contain deletes, completions etc.
// Currently a placeholder to allow MissionContextType to work.
interface MissionAction {
  type: string
  payload: number
}

// Defines the state structure for the application
interface MissionStateType {
  currentTasks: Mission[]
}

// Declares the initial state of the application - can later be replaced to read from memory
export const initialState : MissionStateType  = {
  currentTasks: []
}

// Defines the structure of the context of the application
interface MissionContextType {
  state: MissionStateType
  dispatch: React.Dispatch<MissionAction>;
}

// Declares context for the application
export const MissionContext = createContext<MissionContextType | null>(null);

// Declares the reducer for the application
// Parameters:
//  - state: The current state of the application
//  - action: The action acting on the state
export const missionReducer = (state: MissionStateType, action: MissionAction) => {
  switch (action.type) {
    default:
      return {
        ...state
      }
  }
}
