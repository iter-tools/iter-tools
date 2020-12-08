import { notAsyncLoopable } from 'iter-tools-es';

describe('notAsyncLoopable', () => {
  describe('when value can be used with a `for await..of` loop', () => {
    it('returns false', () => {
      expect(notAsyncLoopable((async function* () {})())).toBe(false);
      expect(notAsyncLoopable((function* () {})())).toBe(false);
      expect(notAsyncLoopable([])).toBe(false);
    });
  });

  describe('when value cannot be used with a `for await..of` loop', () => {
    it('returns true', () => {
      expect(notAsyncLoopable({})).toBe(true);
      expect(notAsyncLoopable(undefined)).toBe(true);
      expect(notAsyncLoopable(null)).toBe(true);
    });
  });
});
