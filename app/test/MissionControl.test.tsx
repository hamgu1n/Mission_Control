import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MissionControl from '../components/MissionControl';
import { MissionContext } from '@/context/MissionContext';

// -------------------- MOCKS --------------------

// Mission
jest.mock('../components/Mission', () => ({
  __esModule: true,
  default: () => <div data-testid="mission" />,
}));

// FilterMenu
jest.mock('../components/FilterMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="filter-menu" />,
}));

// AddMissionPopup
jest.mock('../components/AddMissionPopup', () => ({
  __esModule: true,
  default: () => <div data-testid="popup" />,
}));

// Icon components (Lucide)
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <div data-testid="chevron-left" />,
  ChevronRight: () => <div data-testid="chevron-right" />,
  Plus: () => <div data-testid="plus" />,
}));

// -------------------- TEST DATA --------------------

const mockState = {
  currentMissions: [
    {
      title: 'Test Mission',
      tags: [],
    },
  ],
  currentFilters: [],
  currentFilterLogic: 'AND' as const,
  searchText: '',
  showFilterMenu: false,
};

const dispatch = jest.fn();

const renderComponent = () =>
  render(
    <MissionContext.Provider value={{ state: mockState, dispatch }}>
      <MissionControl />
    </MissionContext.Provider>
  );

// -------------------- TESTS --------------------

describe('MissionControl', () => {
  beforeEach(() => {
    dispatch.mockClear();
  });

  test('renders mission list', () => {
    renderComponent();

    expect(screen.getByTestId('mission')).toBeInTheDocument();
  });

  test('opens mission popup when plus clicked', async () => {
    renderComponent();

    await userEvent.click(screen.getByTestId('plus'));

    expect(screen.getByTestId('popup')).toBeInTheDocument();
  });

  test('shows filter menu when enabled in context', () => {
    render(
      <MissionContext.Provider
        value={{
          state: { ...mockState, showFilterMenu: true },
          dispatch,
        }}
      >
        <MissionControl />
      </MissionContext.Provider>
    );

    expect(screen.getByTestId('filter-menu')).toBeInTheDocument();
  });

  test('toggle button exists and is clickable', async () => {
    renderComponent();

    // stable target: icon inside toggle button
    const toggleButton = screen.getByTestId('chevron-left').closest('button');

    expect(toggleButton).toBeInTheDocument();

    if (toggleButton) {
      await userEvent.click(toggleButton);
    }
  });
});
