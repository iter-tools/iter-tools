import { notUndefined } from '@iter-tools/es';

describe('notUndefined', () => {
  describe('when value is undefined', () => {
    it('returns false', () => {
      expect(notUndefined(undefined)).toBe(false);
    });
  });

  describe('when value is not undefined', () => {
    it('returns true', () => {
      expect(notUndefined(null)).toBe(true);
      expect(notUndefined(0)).toBe(true);
      expect(notUndefined({})).toBe(true);
      expect(notUndefined(NaN)).toBe(true);
    });
  });
});
