import {
  areTagsEqual,
  isTagActive,
  removeTag,
  addTag,
  setStatusFilter,
} from '../../helpers/filterTags';

import type { Tag } from '@/context/MissionContext';

// -------------------- TEST DATA --------------------

const tagA: Tag = { name: 'Work', type: 'label', color: 'tag-red' };
const tagB: Tag = { name: 'Work', type: 'label', color: 'tag-blue' };
const tagC: Tag = { name: 'Home', type: 'label', color: 'tag-green' };

const statusTag: Tag = { name: 'Done', type: 'status', color: 'tag-green' };

// -------------------- TESTS --------------------

describe('filterTags helpers', () => {
  // -------- areTagsEqual --------
  test('areTagsEqual returns true for same name and type', () => {
    expect(areTagsEqual(tagA, tagB)).toBe(true);
  });

  test('areTagsEqual returns false for different tags', () => {
    expect(areTagsEqual(tagA, tagC)).toBe(false);
  });

  // -------- isTagActive --------
  test('isTagActive returns true when tag exists in filters', () => {
    expect(isTagActive(tagA, [tagA, tagC])).toBe(true);
  });

  test('isTagActive returns false when tag not in filters', () => {
    expect(isTagActive(tagA, [tagC])).toBe(false);
  });

  // -------- removeTag --------
  test('removeTag removes matching tag', () => {
    const result = removeTag([tagA, tagC], tagA);

    expect(result).toEqual([tagC]);
  });

  // -------- addTag --------
  test('addTag adds tag to filters', () => {
    const result = addTag([tagA], tagC);

    expect(result).toEqual([tagA, tagC]);
  });

  // -------- setStatusFilter --------
  test('setStatusFilter replaces existing status tag', () => {
    const result = setStatusFilter([tagA, statusTag], {
      name: 'New',
      type: 'status',
      color: 'tag-blue',
    });

    expect(result).toEqual([
      tagA,
      { name: 'New', type: 'status', color: 'tag-blue' },
    ]);
  });

  test('setStatusFilter removes status when null', () => {
    const result = setStatusFilter([tagA, statusTag], null);

    expect(result).toEqual([tagA]);
  });
});
