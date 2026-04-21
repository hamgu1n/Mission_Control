import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import IconButton from '../components/IconButton';
import type { IconButtonProps } from '../components/IconButton';
import { Sun } from 'lucide-react';

describe('IconButton', () => {
  const baseProps: IconButtonProps = {
    icon: Sun,
    onClick: jest.fn(),
  };

  test('renders icon', () => {
    render(<IconButton {...baseProps} />);

    // Lucide renders an SVG, so just check role
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('calls onClick when clicked', async () => {
    const onClick = jest.fn();

    render(<IconButton {...baseProps} onClick={onClick} />);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });

  test('applies default hover class', () => {
    render(<IconButton {...baseProps} />);

    expect(screen.getByRole('button').className).toContain(
      'hover:text-slate-600'
    );
  });

  test('applies correct hover color class', () => {
    render(<IconButton {...baseProps} hoverColor="red" />);

    expect(screen.getByRole('button').className).toContain(
      'hover:text-red-500'
    );
  });

  test('supports hoverColor none', () => {
    render(<IconButton {...baseProps} hoverColor="none" />);

    expect(screen.getByRole('button').className).not.toContain('hover:text');
  });
});
