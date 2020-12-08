import { isNull } from 'iter-tools-es';

describe('isNull', () => {
  describe('when value is null', () => {
    it('returns true', () => {
      expect(isNull(null)).toBe(true);
    });
  });

  describe('when value is not null', () => {
    it('returns false', () => {
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull({})).toBe(false);
      expect(isNull(NaN)).toBe(false);
    });
  });
});
