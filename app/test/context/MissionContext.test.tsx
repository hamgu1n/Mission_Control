import { missionReducer, initialState } from '@/context/MissionContext';
import type { Mission, Tag } from '@/context/MissionContext';

// mock missionSweeper
jest.mock('@/app/helpers/missionSweeper', () => ({
  missionSweeper: jest.fn(),
}));

import { missionSweeper } from '@/app/helpers/missionSweeper';

describe('missionReducer', () => {
  const baseMission: Mission = {
    title: 'Test Mission',
    tags: [],
    goals: [],
    resources: [],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // -------------------- ADD --------------------

  test('ADD_MISSION adds a mission', () => {
    const newState = missionReducer(initialState, {
      type: 'ADD_MISSION',
      payload: baseMission,
    });

    expect(newState.currentMissions).toHaveLength(1);
    expect(newState.currentMissions[0]).toEqual(baseMission);
  });

  // -------------------- DELETE --------------------

  test('DELETE_MISSION removes a mission', () => {
    const state = {
      ...initialState,
      currentMissions: [baseMission],
    };

    const newState = missionReducer(state, {
      type: 'DELETE_MISSION',
      payload: baseMission,
    });

    expect(newState.currentMissions).toHaveLength(0);
  });

  // -------------------- EDIT --------------------

  test('EDIT_MISSION replaces the correct mission', () => {
    const updatedMission: Mission = { ...baseMission, title: 'Updated' };

    const state = {
      ...initialState,
      currentMissions: [baseMission],
    };

    const newState = missionReducer(state, {
      type: 'EDIT_MISSION',
      payload: {
        original: baseMission,
        updated: updatedMission,
      },
    });

    expect(newState.currentMissions[0].title).toBe('Updated');
  });

  // -------------------- MARK DONE --------------------

  test('MARK_DONE adds Done status and timestamp', () => {
    const state = {
      ...initialState,
      currentMissions: [baseMission],
    };

    const newState = missionReducer(state, {
      type: 'MARK_DONE',
      payload: baseMission,
      timestamp: { date: '2026-01-01', time: '12:00' },
    });

    const tags = newState.currentMissions[0].tags as Tag[];

    expect(tags.some((t) => t.name === 'Done')).toBe(true);
    expect(tags.some((t) => t.type === 'metadata')).toBe(true);
  });

  test('MARK_DONE removes previous status tags', () => {
    const missionWithStatus: Mission = {
      ...baseMission,
      tags: [{ name: 'New', type: 'status', color: 'blue' }],
    };

    const state = {
      ...initialState,
      currentMissions: [missionWithStatus],
    };

    const newState = missionReducer(state, {
      type: 'MARK_DONE',
      payload: missionWithStatus,
    });

    const tags = newState.currentMissions[0].tags as Tag[];

    expect(tags.find((t) => t.name === 'New')).toBeUndefined();
    expect(tags.find((t) => t.name === 'Done')).toBeDefined();
  });

  // -------------------- MARK IN PROGRESS --------------------

  test('MARK_IN_PROGRESS sets correct status', () => {
    const state = {
      ...initialState,
      currentMissions: [baseMission],
    };

    const newState = missionReducer(state, {
      type: 'MARK_IN_PROGRESS',
      payload: baseMission,
    });

    const tags = newState.currentMissions[0].tags as Tag[];

    expect(tags.some((t) => t.name === 'In Progress')).toBe(true);
  });

  // -------------------- CLEAN DONE --------------------

  test('CLEAN_DONE removes missions flagged by missionSweeper', () => {
    (missionSweeper as jest.Mock).mockReturnValue(true);

    const state = {
      ...initialState,
      currentMissions: [baseMission],
    };

    const newState = missionReducer(state, {
      type: 'CLEAN_DONE',
    });

    expect(newState.currentMissions).toHaveLength(0);
  });

  // -------------------- FILTERS --------------------

  test('SET_FILTERS updates filters', () => {
    const tags: Tag[] = [{ name: 'Work', color: 'blue' }];

    const newState = missionReducer(initialState, {
      type: 'SET_FILTERS',
      payload: tags,
    });

    expect(newState.currentFilters).toEqual(tags);
  });

  test('SET_FILTER_LOGIC updates logic', () => {
    const newState = missionReducer(initialState, {
      type: 'SET_FILTER_LOGIC',
      payload: 'OR',
    });

    expect(newState.currentFilterLogic).toBe('OR');
  });

  // -------------------- SEARCH --------------------

  test('SET_SEARCH_TEXT updates search text', () => {
    const newState = missionReducer(initialState, {
      type: 'SET_SEARCH_TEXT',
      payload: 'hello',
    });

    expect(newState.searchText).toBe('hello');
  });

  // -------------------- UI --------------------

  test('TOGGLE_FILTER_MENU updates visibility', () => {
    const newState = missionReducer(initialState, {
      type: 'TOGGLE_FILTER_MENU',
      payload: true,
    });

    expect(newState.showFilterMenu).toBe(true);
  });

  // -------------------- DEFAULT --------------------

  test('returns current state for unknown action', () => {
    const newState = missionReducer(initialState, {
      type: 'UNKNOWN' as never,
    });

    expect(newState).toEqual(initialState);
  });
});
