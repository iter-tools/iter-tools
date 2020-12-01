import { notAsyncIterable } from '@iter-tools/es';

describe('notAsyncIterable', () => {
  describe('when value is an async iterable', () => {
    it('returns false', () => {
      expect(notAsyncIterable((async function* () {})())).toBe(false);
    });
  });

  describe('when value is not an async iterable', () => {
    it('returns true', () => {
      expect(notAsyncIterable((function* () {})())).toBe(true);
      expect(notAsyncIterable([])).toBe(true);
      expect(notAsyncIterable({})).toBe(true);
      expect(notAsyncIterable(undefined)).toBe(true);
      expect(notAsyncIterable(null)).toBe(true);
    });
  });
});
