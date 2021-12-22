import { notString } from 'iter-tools-es';

describe('notString', () => {
  describe('when value is not a string', () => {
    it('returns true', () => {
      expect(notString(null)).toBe(true);
      expect(notString(undefined)).toBe(true);
      expect(notString(0)).toBe(true);
      expect(notString({})).toBe(true);
      expect(notString(NaN)).toBe(true);
    });
  });

  describe('when value is a string', () => {
    it('returns false', () => {
      expect(notString('')).toBe(false);
      expect(notString('foo')).toBe(false);
    });
  });
});
