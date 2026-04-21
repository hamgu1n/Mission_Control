import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddMissionPopup from '../components/AddMissionPopup';
import { Mission } from '@/context/MissionContext';

jest.mock('../components/MissionInput', () => {
  return function MockMissionInput() {
    return <div>MissionInput Component</div>;
  };
});

jest.mock('lucide-react', () => ({
  X: () => <span>X Icon</span>,
}));

describe('AddMissionPopup', () => {
  test('does not render when closed', () => {
    render(<AddMissionPopup isOpen={false} onClose={jest.fn()} />);

    expect(screen.queryByText('Add Mission')).not.toBeInTheDocument();
  });

  test('renders Add Mission title when no editMission', () => {
    render(<AddMissionPopup isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByText('Add Mission')).toBeInTheDocument();
  });

  test('renders Edit Mission title when editMission exists', () => {
    render(
      <AddMissionPopup
        isOpen={true}
        onClose={jest.fn()}
        editMission={{ title: 'Test' } as Mission}
      />
    );

    expect(screen.getByText('Edit Mission')).toBeInTheDocument();
  });

  test('calls onClose when X button is clicked', async () => {
    const onClose = jest.fn();

    render(<AddMissionPopup isOpen={true} onClose={onClose} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(onClose).toHaveBeenCalled();
  });
});
