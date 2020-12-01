import { isWrappable } from '@iter-tools/es';

describe('isWrappable', () => {
  describe('when value can be an input to wrap', () => {
    it('returns true', () => {
      expect(isWrappable([])).toBe(true);
      expect(isWrappable(undefined)).toBe(true);
      expect(isWrappable(null)).toBe(true);
    });
  });

  describe('when value cannot be an input to wrap', () => {
    it('returns false', () => {
      expect(isWrappable({})).toBe(false);
    });
  });
});
