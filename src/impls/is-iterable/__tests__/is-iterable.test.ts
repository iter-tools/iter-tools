import { isIterable } from 'iter-tools-es';

describe('isIterable', () => {
  describe('when value has Symbol.iterator', () => {
    it('returns true', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable({ [Symbol.iterator]: null })).toBe(true);
    });
  });

  describe('when value does not have Symbol.iterator', () => {
    it('returns false', () => {
      expect(isIterable(undefined)).toBe(false);
      expect(isIterable(null)).toBe(false);
      expect(isIterable(42)).toBe(false);
      expect(isIterable({})).toBe(false);
    });
  });
});
