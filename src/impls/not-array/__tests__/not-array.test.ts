import { notArray } from 'iter-tools-es';

describe('notArray', () => {
  describe('when value is not an array', () => {
    it('returns true', () => {
      expect(notArray('')).toBe(true);
      expect(notArray(null)).toBe(true);
      expect(notArray(undefined)).toBe(true);
      expect(notArray({})).toBe(true);
    });
  });

  describe('when value is an array', () => {
    it('returns false', () => {
      expect(notArray([])).toBe(false);
      expect(notArray(['foo'])).toBe(false);
    });
  });
});
