import { arrayLastOr } from '../../..';

describe('arrayLastOr', () => {
  describe('when there is no array', () => {
    it('returns undefined', () => {
      expect(arrayLastOr(null)).toBe(null);
    });
  });

  describe('when the array is empty', () => {
    it('returns undefined', () => {
      expect(arrayLastOr(null, [])).toBe(null);
    });
  });

  describe('when the array is not empty', () => {
    it('returns the last value', () => {
      expect(arrayLastOr(null, [1, 2, 3])).toBe(3);
    });
  });
});
