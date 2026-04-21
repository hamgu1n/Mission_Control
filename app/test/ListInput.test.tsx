import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListInput from '../components/ListInput';

describe('ListInput', () => {
  const baseProps = {
    items: ['one'],
    setItems: jest.fn(),
    icon: '-',
    addLabel: 'item',
    placeholder: 'Type here',
  };

  test('renders existing items', () => {
    render(<ListInput {...baseProps} />);

    expect(screen.getByDisplayValue('one')).toBeInTheDocument();
  });

  test('calls setItems when typing', async () => {
    const setItems = jest.fn();

    render(<ListInput {...baseProps} setItems={setItems} />);

    await userEvent.type(screen.getByDisplayValue('one'), ' updated');

    expect(setItems).toHaveBeenCalled();
  });

  test('adds new item when clicking add button', async () => {
    const setItems = jest.fn();

    render(<ListInput {...baseProps} setItems={setItems} />);

    await userEvent.click(screen.getByText('+ Add another item'));

    expect(setItems).toHaveBeenCalledWith(['one', '']);
  });

  test('adds new item on Enter key', async () => {
    const setItems = jest.fn();

    render(<ListInput {...baseProps} setItems={setItems} />);

    await userEvent.type(screen.getByDisplayValue('one'), '{enter}');

    expect(setItems).toHaveBeenCalledWith(['one', '']);
  });
});
