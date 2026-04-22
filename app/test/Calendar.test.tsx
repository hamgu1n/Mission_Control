import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useReducer } from 'react';
import Calendar from '../components/Calendar';
import {
  initialState,
  MissionContext,
  missionReducer,
  type Mission,
} from '@/context/MissionContext';

// -------------------- MOCKS --------------------

jest.mock('@fullcalendar/react', () => {
  type CalendarEvent = {
    title?: string;
    classNames?: string[];
    extendedProps?: {
      mission?: unknown;
    };
  };

  type FullCalendarProps = {
    buttonText: {
      month: string;
      week: string;
    };
    eventClick?: (eventInfo: { event: CalendarEvent }) => void;
    events: CalendarEvent[];
  };

  const MockFullCalendar = ({
    buttonText,
    eventClick,
    events,
  }: FullCalendarProps) => (
    <div>
      <button>{buttonText.month}</button>
      <button>{buttonText.week}</button>
      {events.map((event) => (
        <button
          className={event.classNames?.join(' ')}
          key={event.title}
          onClick={() => eventClick?.({ event })}
        >
          {event.title}
        </button>
      ))}
    </div>
  );

  MockFullCalendar.displayName = 'MockFullCalendar';
  return { __esModule: true, default: MockFullCalendar };
});

jest.mock('@fullcalendar/daygrid', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../components/AddMissionPopup', () => ({
  __esModule: true,
  default: ({
    editMission,
    isOpen,
  }: {
    editMission?: { title: string };
    isOpen: boolean;
  }) => (isOpen ? <div data-testid="popup">{editMission?.title}</div> : null),
}));

// -------------------- TEST DATA --------------------

const datedMission: Mission = {
  title: 'Calendar Mission',
  tags: [{ name: '2026-04-21', color: 'tag-slate', type: 'date' }],
};

const doneMission: Mission = {
  title: 'Done Calendar Mission',
  tags: [
    { name: '2026-04-21', color: 'tag-slate', type: 'date' },
    { name: 'Done', color: 'tag-green', type: 'status' },
  ],
};

const highPriorityMission: Mission = {
  ...datedMission,
  title: 'High Priority Mission',
  priority: 'high',
};

const dispatch = jest.fn();

const mockState = {
  ...initialState,
  currentMissions: [],
};

function CalendarWithAddButton() {
  const [state, reducerDispatch] = useReducer(missionReducer, mockState);

  return (
    <MissionContext.Provider value={{ state, dispatch: reducerDispatch }}>
      <button
        onClick={() =>
          reducerDispatch({ type: 'ADD_MISSION', payload: datedMission })
        }
      >
        add mission
      </button>
      <Calendar />
    </MissionContext.Provider>
  );
}

const renderComponent = (missions: Mission[] = []) =>
  render(
    <MissionContext.Provider
      value={{ state: { ...mockState, currentMissions: missions }, dispatch }}
    >
      <Calendar />
    </MissionContext.Provider>
  );

// -------------------- TESTS --------------------

describe('Calendar', () => {
  beforeAll(() => {
    global.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('shows added mission on monthly view', async () => {
    render(<CalendarWithAddButton />);

    expect(screen.getByText('Monthly')).toBeInTheDocument();
    expect(screen.queryByText('Calendar Mission')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('add mission'));

    expect(screen.getByText('Calendar Mission')).toBeInTheDocument();
  });

  test('does not show done missions', () => {
    renderComponent([doneMission]);

    expect(screen.queryByText('Done Calendar Mission')).not.toBeInTheDocument();
  });

  test('opens edit popup when mission event is clicked', async () => {
    renderComponent([datedMission]);

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();

    await userEvent.click(screen.getByText('Calendar Mission'));

    expect(screen.getByTestId('popup')).toHaveTextContent('Calendar Mission');
  });

  test('shows priority color class', () => {
    renderComponent([highPriorityMission]);

    expect(screen.getByText('High Priority Mission')).toHaveClass(
      'priority-red'
    );
  });

  test('shows no priority color class when priority is missing', () => {
    renderComponent([datedMission]);

    expect(screen.getByText('Calendar Mission')).toHaveClass('priority-none');
  });
});
