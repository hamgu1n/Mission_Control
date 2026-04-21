import { areTagsDistinct } from '../../helpers/areTagsDistinct';

describe('areTagsDistinct', () => {
  test('returns true for unique tags', () => {
    expect(areTagsDistinct(['a', 'b', 'c'])).toBe(true);
  });

  test('returns false for duplicate tags', () => {
    expect(areTagsDistinct(['a', 'b', 'a'])).toBe(false);
  });

  test('is case-insensitive', () => {
    expect(areTagsDistinct(['Tag', 'tag'])).toBe(false);
  });

  test('trims whitespace before comparing', () => {
    expect(areTagsDistinct(['tag', ' tag '])).toBe(false);
  });

  test('ignores empty strings', () => {
    expect(areTagsDistinct(['', 'a', '  '])).toBe(true);
  });

  test('mix of valid unique tags returns true', () => {
    expect(areTagsDistinct(['A', 'B', 'C'])).toBe(true);
  });
});
