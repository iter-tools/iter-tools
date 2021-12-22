import { isString } from 'iter-tools-es';

describe('isString', () => {
  describe('when value is a string', () => {
    it('returns true', () => {
      expect(isString('')).toBe(true);
      expect(isString('foo')).toBe(true);
    });
  });

  describe('when value is not a string', () => {
    it('returns false', () => {
      expect(isString(null)).toBe(false);
      expect(isString(undefined)).toBe(false);
      expect(isString(0)).toBe(false);
      expect(isString({})).toBe(false);
      expect(isString(NaN)).toBe(false);
    });
  });
});
