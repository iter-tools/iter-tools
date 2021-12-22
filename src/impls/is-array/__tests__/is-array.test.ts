import { isArray } from 'iter-tools-es';

describe('isArray', () => {
  describe('when value is an array', () => {
    it('returns true', () => {
      expect(isArray([])).toBe(true);
      expect(isArray(['foo'])).toBe(true);
    });
  });

  describe('when value is not an array', () => {
    it('returns false', () => {
      expect(isArray('')).toBe(false);
      expect(isArray(null)).toBe(false);
      expect(isArray(undefined)).toBe(false);
      expect(isArray({})).toBe(false);
    });
  });
});
