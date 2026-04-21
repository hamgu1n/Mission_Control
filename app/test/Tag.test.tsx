import { render, screen } from '@testing-library/react';
import Tag from '../components/Tag';
import type { Tag as TagType } from '@/context/MissionContext';

// -------------------- TESTS --------------------

describe('Tag', () => {
  test('renders status tag as dot', () => {
    const tag: TagType = {
      name: 'Done',
      type: 'status',
      color: 'tag-green',
    };

    render(<Tag tag={tag} />);

    const el = screen.getByTitle('Done');

    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('tag-green');
  });

  test('renders label tag as text', () => {
    const tag: TagType = {
      name: 'Urgent',
      type: 'label',
      color: 'tag-red',
    };

    render(<Tag tag={tag} />);

    expect(screen.getByText('Urgent')).toBeInTheDocument();
  });

  test('uses default color when missing', () => {
    const tag: TagType = {
      name: 'NoColor',
      type: 'label',
      color: '',
    };

    render(<Tag tag={tag} />);

    const el = screen.getByText('NoColor');

    expect(el).toHaveClass('tag-none');
  });
});
