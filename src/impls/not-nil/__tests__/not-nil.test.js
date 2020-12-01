import { notNil } from 'iter-tools-es';

describe('notNil', () => {
  describe('when value is null or undefined', () => {
    it('returns false', () => {
      expect(notNil(undefined)).toBe(false);
      expect(notNil(null)).toBe(false);
    });
  });

  describe('when value is not null or undefined', () => {
    it('returns true', () => {
      expect(notNil(0)).toBe(true);
      expect(notNil({})).toBe(true);
      expect(notNil(NaN)).toBe(true);
    });
  });
});
