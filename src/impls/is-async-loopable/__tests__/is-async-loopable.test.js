import { isAsyncLoopable } from 'iter-tools-es';

describe('isAsyncLoopable', () => {
  describe('when value can be used with a `for await..of` loop', () => {
    it('returns true', () => {
      expect(isAsyncLoopable((async function* () {})())).toBe(true);
      expect(isAsyncLoopable((function* () {})())).toBe(true);
      expect(isAsyncLoopable([])).toBe(true);
    });
  });

  describe('when value cannot be used with a `for await..of` loop', () => {
    it('returns false', () => {
      expect(isAsyncLoopable({})).toBe(false);
      expect(isAsyncLoopable(undefined)).toBe(false);
      expect(isAsyncLoopable(null)).toBe(false);
    });
  });
});
