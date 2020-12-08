import { arrayFirst } from 'iter-tools-es';

describe('arrayFirst', () => {
  describe('when there is no array', () => {
    it('returns undefined', () => {
      expect(arrayFirst()).toBe(undefined);
    });
  });

  describe('when the array is empty', () => {
    it('returns undefined', () => {
      expect(arrayFirst([])).toBe(undefined);
    });
  });

  describe('when the array is not empty', () => {
    it('returns the first value', () => {
      expect(arrayFirst([1, 2, 3])).toBe(1);
    });
  });
});
