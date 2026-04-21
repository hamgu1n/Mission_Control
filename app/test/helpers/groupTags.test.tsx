import { groupTags } from '../../helpers/groupTags';
import type { Tag } from '@/context/MissionContext';

// -------------------- TEST DATA --------------------

const tagA: Tag = { name: 'Work', type: 'label', color: 'tag-red' };
const tagB: Tag = { name: 'Home', type: 'label', color: 'tag-blue' };

const status: Tag = { name: 'Done', type: 'status', color: 'tag-green' };

const date: Tag = { name: '2026-01-01', type: 'date', color: 'tag-slate' };

const time: Tag = { name: '10:00', type: 'time', color: 'tag-slate' };

// -------------------- TESTS --------------------

describe('groupTags', () => {
  test('groups tags by type correctly', () => {
    const result = groupTags([{ tags: [tagA, status, date, time] }]);

    expect(result.labelTags).toEqual([tagA]);
    expect(result.statusTags).toEqual([status]);
    expect(result.dateTags).toEqual([date]);
    expect(result.timeTags).toEqual([time]);
  });

  test('removes duplicates by name', () => {
    const duplicateTag: Tag = {
      name: 'Work',
      type: 'label',
      color: 'tag-red',
    };

    const result = groupTags([{ tags: [tagA, duplicateTag] }]);

    expect(result.labelTags).toEqual([tagA]);
  });

  test('handles multiple missions', () => {
    const result = groupTags([
      { tags: [tagA, status] },
      { tags: [tagB, date] },
    ]);

    expect(result.labelTags).toEqual([tagA, tagB]);
    expect(result.statusTags).toEqual([status]);
    expect(result.dateTags).toEqual([date]);
  });

  test('handles missing tags safely', () => {
    const result = groupTags([{}, { tags: undefined }]);

    expect(result).toEqual({
      labelTags: [],
      statusTags: [],
      dateTags: [],
      timeTags: [],
    });
  });

  test('treats unknown tag type as label fallback behavior', () => {
    const weirdTag = {
      name: 'Weird',
      type: '' as Tag['type'], // safe override, no `any`
      color: 'tag-red',
    };

    const result = groupTags([{ tags: [weirdTag as Tag] }]);

    expect(result.labelTags).toEqual([weirdTag as Tag]);
  });
});
