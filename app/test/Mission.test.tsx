import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Mission from '../components/Mission';
import type { Mission as MissionType } from '@/context/MissionContext';
import { MissionContext } from '@/context/MissionContext';
import type { IconButtonProps } from '../components/IconButton';
import { JSX } from 'react';

// -------------------- MOCKS --------------------

// Tag
jest.mock('../components/Tag', () => {
  type TagType = { tag: { name: string } };

  const MockTag = ({ tag }: TagType): JSX.Element => <div>{tag.name}</div>;

  MockTag.displayName = 'MockTag';
  return { __esModule: true, default: MockTag };
});

// AddMissionPopup
jest.mock('../components/AddMissionPopup', () => ({
  __esModule: true,
  default: (): JSX.Element => <div data-testid="popup" />,
}));

// IconButton (NO any)
jest.mock('../components/IconButton', () => {
  const MockIconButton = ({ onClick }: IconButtonProps): JSX.Element => (
    <button onClick={onClick}>icon</button>
  );

  MockIconButton.displayName = 'MockIconButton';
  return MockIconButton;
});

// helpers
jest.mock('../helpers/getCurrentTime', () => ({
  getCurrentDateTime: (): string => 'now',
}));

jest.mock('../helpers/isPastDue', () => ({
  __esModule: true,
  default: (): boolean => false,
}));

// -------------------- TESTS --------------------

const mockState = {
  currentMissions: [],
  currentFilters: [],
  currentFilterLogic: 'AND' as const,
  searchText: '',
  showFilterMenu: false,
};

describe('Mission', () => {
  const dispatch = jest.fn();

  const mission: MissionType = {
    title: 'Test Mission',
    tags: [],
    goals: [],
    resources: [],
  } as MissionType;

  const renderComponent = (overrideMission: MissionType = mission) =>
    render(
      <MissionContext.Provider
        value={{
          state: mockState,
          dispatch,
        }}
      >
        <Mission mission={overrideMission} />
      </MissionContext.Provider>
    );

  beforeEach(() => {
    dispatch.mockClear();
  });

  test('renders mission title', () => {
    renderComponent();

    expect(screen.getByText('Test Mission')).toBeInTheDocument();
  });

  test('does not render when mission is done', () => {
    renderComponent({
      ...mission,
      tags: [{ name: 'Done', type: 'status', color: 'green' }],
    });

    expect(screen.queryByText('Test Mission')).not.toBeInTheDocument();
  });

  test('toggles expansion and shows content', async () => {
    renderComponent();

    await userEvent.click(screen.getAllByText('icon')[0]);

    expect(screen.getByText('No description')).toBeInTheDocument();
  });

  test('dispatches DELETE_MISSION when trash clicked', async () => {
    renderComponent();

    await userEvent.click(screen.getAllByText('icon')[3]);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'DELETE_MISSION',
      payload: mission,
    });
  });

  test('opens edit popup when pencil clicked', async () => {
    renderComponent();

    await userEvent.click(screen.getAllByText('icon')[2]);

    expect(screen.getByTestId('popup')).toBeInTheDocument();
  });

  test('marks mission as done', async () => {
    renderComponent();

    await userEvent.click(screen.getAllByText('icon')[1]);

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'MARK_DONE',
      })
    );
  });
});
