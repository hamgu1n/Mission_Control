import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ButtonRow from '../components/ButtonRow';

describe('ButtonRow', () => {
  const options = [
    { label: 'High', color: 'red' },
    { label: 'Medium', color: 'yellow' },
    { label: 'Low', color: 'green' },
  ];

  test('renders all buttons', () => {
    render(<ButtonRow options={options} selected="" onSelect={jest.fn()} />);

    expect(screen.getByText('High')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
    expect(screen.getByText('Low')).toBeInTheDocument();
  });

  test('calls onSelect with correct value when clicked', async () => {
    const onSelect = jest.fn();

    render(<ButtonRow options={options} selected="" onSelect={onSelect} />);

    await userEvent.click(screen.getByText('High'));

    expect(onSelect).toHaveBeenCalledWith('high');
  });

  test('deselects when clicking already selected button', async () => {
    const onSelect = jest.fn();

    render(<ButtonRow options={options} selected="high" onSelect={onSelect} />);

    await userEvent.click(screen.getByText('High'));

    expect(onSelect).toHaveBeenCalledWith('');
  });

  test('applies selected styling to selected button', () => {
    render(
      <ButtonRow options={options} selected="high" onSelect={jest.fn()} />
    );

    const selectedButton = screen.getByText('High');

    expect(selectedButton.className).toContain('priority-red');
  });
});
