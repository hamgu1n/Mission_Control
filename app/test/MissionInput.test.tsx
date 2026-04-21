import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MissionInput from '../components/MissionInput';
import { MissionContext } from '@/context/MissionContext';
import type { Mission, MissionContextType } from '@/context/MissionContext';

// -------------------- MOCKS --------------------

// ListInput
jest.mock('../components/ListInput', () => ({
  __esModule: true,
  default: ({
    items,
    setItems,
  }: {
    items: string[];
    setItems: (v: string[]) => void;
  }) => (
    <div>
      <div data-testid="listinput">{items.join(',')}</div>
      <button onClick={() => setItems([...items, 'test'])}>add</button>
    </div>
  ),
}));

// ButtonRow
jest.mock('../components/ButtonRow', () => ({
  __esModule: true,
  default: ({ onSelect }: { onSelect: (v: string) => void }) => (
    <button onClick={() => onSelect('high')}>priority</button>
  ),
}));

// Lucide
jest.mock('lucide-react', () => ({
  Tag: () => <div data-testid="tag-icon" />,
}));

// helpers
jest.mock('../helpers/areTagsDistinct', () => ({
  areTagsDistinct: () => true,
}));

// -------------------- TESTS --------------------

describe('MissionInput', () => {
  const dispatch = jest.fn();
  const onSuccess = jest.fn();
  const onClose = jest.fn();

  const mockContext: MissionContextType = {
    state: {
      currentMissions: [],
      currentFilters: [],
      currentFilterLogic: 'AND',
    },
    dispatch,
  };

  const renderComponent = (editMission?: Mission) =>
    render(
      <MissionContext.Provider value={mockContext}>
        <MissionInput
          onSuccess={onSuccess}
          onClose={onClose}
          editMission={editMission}
        />
      </MissionContext.Provider>
    );

  beforeEach(() => {
    dispatch.mockClear();
    onSuccess.mockClear();
    onClose.mockClear();
  });

  test('renders form', () => {
    renderComponent();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  test('dispatches ADD_MISSION on submit', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.type(
      screen.getByPlaceholderText('Add a new mission'),
      'New Mission'
    );

    await user.click(screen.getByText('Done'));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD_MISSION',
      })
    );
  });

  test('dispatches EDIT_MISSION when editing', async () => {
    const user = userEvent.setup();

    const mission = {
      title: 'Edit Me',
      tags: [],
      goals: [],
      resources: [],
    } as Mission;

    renderComponent(mission);

    await user.click(screen.getByText('Save'));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'EDIT_MISSION',
      })
    );
  });

  test('toggles tags section', async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.click(screen.getByTestId('tag-icon'));

    expect(screen.getByPlaceholderText(/tags/i)).toBeInTheDocument();
  });
});
