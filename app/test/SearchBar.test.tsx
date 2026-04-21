import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../components/SearchBar';
import { MissionContext } from '@/context/MissionContext';
import type { MissionContextType } from '@/context/MissionContext';

// -------------------- MOCKS --------------------

// IconButton
jest.mock('../components/IconButton', () => ({
  __esModule: true,
  default: ({ onClick }: { onClick: () => void }) => (
    <button onClick={onClick}>filter</button>
  ),
}));

// Lucide icon (no need for real svg)
jest.mock('lucide-react', () => ({
  Funnel: () => <div data-testid="funnel" />,
}));

// -------------------- TESTS --------------------

describe('SearchBar', () => {
  const dispatch = jest.fn();

  const baseState = {
    searchText: '',
    currentMissions: [],
    currentFilters: [],
    currentFilterLogic: 'AND' as const,
    showFilterMenu: false,
  };

  const renderComponent = (stateOverride = {}) =>
    render(
      <MissionContext.Provider
        value={
          {
            state: { ...baseState, ...stateOverride },
            dispatch,
          } as MissionContextType
        }
      >
        <SearchBar />
      </MissionContext.Provider>
    );

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('renders with empty input', () => {
    renderComponent();

    expect(screen.getByPlaceholderText('Search missions')).toBeInTheDocument();
  });

  test('dispatches SET_SEARCH_TEXT on input change', async () => {
    renderComponent();

    await userEvent.type(
      screen.getByPlaceholderText('Search missions'),
      'test'
    );

    expect(dispatch).toHaveBeenCalledWith({
      type: 'SET_SEARCH_TEXT',
      payload: expect.any(String),
    });
  });

  test('dispatches TOGGLE_FILTER_MENU when filter clicked', async () => {
    renderComponent();

    await userEvent.click(screen.getByText('filter'));

    expect(dispatch).toHaveBeenCalledWith({
      type: 'TOGGLE_FILTER_MENU',
      payload: true,
    });
  });
});
