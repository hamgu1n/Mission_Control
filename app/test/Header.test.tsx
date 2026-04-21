import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import { useTheme } from '@/context/ThemeContext';
import type { IconButtonProps } from '../components/IconButton';
import { JSX } from 'react';
import type { ComponentProps } from 'react';
import Image from 'next/image';

jest.mock('next/image', () => {
  type ImageProps = ComponentProps<typeof Image>;

  const MockImage = ({ src, alt, width, height, ...rest }: ImageProps) => {
    return (
      <img
        src={typeof src === 'string' ? src : ''}
        alt={alt}
        width={width}
        height={height}
        {...rest}
      />
    );
  };

  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock SearchBar
jest.mock('../components/SearchBar', () => {
  const MockSearchBar = () => <div>SearchBar</div>;
  MockSearchBar.displayName = 'MockSearchBar';
  return MockSearchBar;
});

jest.mock('../components/IconButton', () => {
  const MockIconButton = ({ onClick }: IconButtonProps): JSX.Element => (
    <button onClick={onClick}>Theme Toggle</button>
  );

  MockIconButton.displayName = 'MockIconButton';
  return MockIconButton;
});

// Mock Theme Context
jest.mock('@/context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Header', () => {
  test('renders default title', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<Header />);

    expect(screen.getByText('Mission Control')).toBeInTheDocument();
  });

  test('renders custom title', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<Header title="Custom Title" />);

    expect(screen.getByText('Custom Title')).toBeInTheDocument();
  });

  test('calls toggleTheme when button is clicked', async () => {
    const toggleTheme = jest.fn();

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme,
    });

    render(<Header />);

    await userEvent.click(screen.getByText('Theme Toggle'));

    expect(toggleTheme).toHaveBeenCalled();
  });

  test('renders correct image based on theme', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<Header />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/logo-light.svg');
  });
});
