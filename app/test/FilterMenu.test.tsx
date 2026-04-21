import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterMenu from '../components/FilterMenu';
import {
  MissionContext,
  MissionContextType,
} from '../../context/MissionContext';
import { LucideIcon } from 'lucide-react';

// Mock hooks
jest.mock('../hooks/useGroupTags', () => ({
  useGroupedTags: () => ({
    labelTags: [{ name: 'Work', color: 'tag-blue' }],
    statusTags: [{ name: 'Done' }],
  }),
}));

const toggleTag = jest.fn();
const setLogic = jest.fn();
const setStatus = jest.fn();

jest.mock('../hooks/useFilterActions', () => ({
  useFilterActions: () => ({
    toggleTag,
    setLogic,
    setStatus,
  }),
}));

// Mock helper
jest.mock('../helpers/filterTags', () => ({
  isTagActive: () => false,
}));

jest.mock('../components/IconButton', () => {
  interface IconButtonProps {
    icon: LucideIcon;
    onClick: () => void;
    size?: string;
    hoverColor?:
      | 'none'
      | 'slate'
      | 'red'
      | 'green'
      | 'yellow'
      | 'violet'
      | 'blue';
  }

  const MockIconButton = ({ onClick }: IconButtonProps) => (
    <button onClick={onClick}>Close</button>
  );

  MockIconButton.displayName = 'MockIconButton';

  return MockIconButton;
});

describe('FilterMenu', () => {
  const mockContext = {
    state: {
      currentMissions: [],
      currentFilters: [],
      currentFilterLogic: 'AND',
    },
    dispatch: jest.fn(),
  };

  function renderWithContext() {
    return render(
      <MissionContext.Provider
        value={mockContext as unknown as MissionContextType}
      >
        <FilterMenu onClose={jest.fn()} />
      </MissionContext.Provider>
    );
  }

  test('renders title and sections', () => {
    renderWithContext();

    expect(screen.getByText('Filter Missions')).toBeInTheDocument();
    expect(screen.getByText('AND')).toBeInTheDocument();
    expect(screen.getByText('OR')).toBeInTheDocument();
    expect(screen.getByText('Work')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn();

    render(
      <MissionContext.Provider
        value={mockContext as unknown as MissionContextType}
      >
        <FilterMenu onClose={onClose} />
      </MissionContext.Provider>
    );

    await userEvent.click(screen.getByText('Close'));

    expect(onClose).toHaveBeenCalled();
  });

  test('calls setLogic when AND/OR is changed', async () => {
    renderWithContext();

    const orOption = screen.getByText('OR');
    await userEvent.click(orOption);

    expect(setLogic).toHaveBeenCalledWith('OR');
  });

  test('calls toggleTag when label tag is clicked', async () => {
    renderWithContext();

    await userEvent.click(screen.getByText('Work'));

    expect(toggleTag).toHaveBeenCalled();
  });

  test('calls setStatus when selecting status', async () => {
    renderWithContext();

    await userEvent.selectOptions(screen.getByRole('combobox'), 'Done');

    expect(setStatus).toHaveBeenCalled();
  });
});
