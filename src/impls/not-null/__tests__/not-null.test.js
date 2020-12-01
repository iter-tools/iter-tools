import { notNull } from '@iter-tools/es';

describe('notNull', () => {
  describe('when value is null', () => {
    it('returns false', () => {
      expect(notNull(null)).toBe(false);
    });
  });

  describe('when value is not null', () => {
    it('returns true', () => {
      expect(notNull(undefined)).toBe(true);
      expect(notNull(0)).toBe(true);
      expect(notNull({})).toBe(true);
      expect(notNull(NaN)).toBe(true);
    });
  });
});
