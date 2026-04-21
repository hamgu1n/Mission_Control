import { renderHook, act } from '@testing-library/react';
import { useFilterActions } from '../../hooks/useFilterActions';
import type { Tag } from '@/context/MissionContext';

// -------------------- TEST DATA --------------------

const tagA: Tag = { name: 'Work', type: 'label', color: 'tag-red' };
const tagB: Tag = { name: 'Home', type: 'label', color: 'tag-blue' };

const statusTag: Tag = { name: 'Done', type: 'status', color: 'tag-green' };

// -------------------- TESTS --------------------

describe('useFilterActions', () => {
  let dispatch: jest.Mock;

  beforeEach(() => {
    dispatch = jest.fn();
  });

  test('toggleTag adds tag when not active', () => {
    const { result } = renderHook(() => useFilterActions(dispatch, []));

    act(() => {
      result.current.toggleTag(tagA);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTERS',
      payload: [tagA],
    });
  });

  test('toggleTag removes tag when already active', () => {
    const { result } = renderHook(() => useFilterActions(dispatch, [tagA]));

    act(() => {
      result.current.toggleTag(tagA);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTERS',
      payload: [],
    });
  });

  test('setLogic dispatches correct value', () => {
    const { result } = renderHook(() => useFilterActions(dispatch, []));

    act(() => {
      result.current.setLogic('OR');
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTER_LOGIC',
      payload: 'OR',
    });
  });

  test('setStatus replaces status filter', () => {
    const { result } = renderHook(() =>
      useFilterActions(dispatch, [tagA, statusTag])
    );

    act(() => {
      result.current.setStatus({
        name: 'New',
        type: 'status',
        color: 'tag-blue',
      });
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTERS',
      payload: [tagA, { name: 'New', type: 'status', color: 'tag-blue' }],
    });
  });

  test('setStatus removes status when null', () => {
    const { result } = renderHook(() =>
      useFilterActions(dispatch, [tagA, statusTag])
    );

    act(() => {
      result.current.setStatus(null);
    });

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_FILTERS',
      payload: [tagA],
    });
  });
});
