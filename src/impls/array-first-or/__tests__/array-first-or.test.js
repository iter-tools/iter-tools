import { arrayFirstOr } from '@iter-tools/es';

describe('arrayFirstOr', () => {
  describe('when there is no array', () => {
    it('returns undefined', () => {
      expect(arrayFirstOr(null)).toBe(null);
    });
  });

  describe('when the array is empty', () => {
    it('returns undefined', () => {
      expect(arrayFirstOr(null, [])).toBe(null);
    });
  });

  describe('when the array is not empty', () => {
    it('returns the first value', () => {
      expect(arrayFirstOr(null, [1, 2, 3])).toBe(1);
    });
  });
});
