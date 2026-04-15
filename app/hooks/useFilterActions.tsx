import { Dispatch } from 'react';
import { Tag } from '../../context/MissionContext';
import {
  addTag,
  removeTag,
  isTagActive,
  setStatusFilter,
} from '../helpers/filterTags';

type Action =
  | { type: 'SET_FILTERS'; payload: Tag[] }
  | { type: 'SET_FILTER_LOGIC'; payload: 'AND' | 'OR' };

export function useFilterActions(
  dispatch: Dispatch<Action>,
  currentFilters: Tag[]
) {
  const toggleTag = (tag: Tag) => {
    const newFilters = isTagActive(tag, currentFilters)
      ? removeTag(currentFilters, tag)
      : addTag(currentFilters, tag);

    dispatch({ type: 'SET_FILTERS', payload: newFilters });
  };

  const setLogic = (logic: 'AND' | 'OR') => {
    dispatch({ type: 'SET_FILTER_LOGIC', payload: logic });
  };

  const setStatus = (tag: Tag | null) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: setStatusFilter(currentFilters, tag),
    });
  };

  return {
    toggleTag,
    setLogic,
    setStatus,
  };
}
