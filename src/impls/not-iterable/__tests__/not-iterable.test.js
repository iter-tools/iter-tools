import { notIterable } from '@iter-tools/es';

describe('notIterable', () => {
  describe('when value has Symbol.iterator', () => {
    it('returns true', () => {
      expect(notIterable([])).toBe(false);
      expect(notIterable(new Map())).toBe(false);
      expect(notIterable(new Set())).toBe(false);
      expect(notIterable({ [Symbol.iterator]: null })).toBe(false);
    });
  });

  describe('when value does not have Symbol.iterator', () => {
    it('returns true', () => {
      expect(notIterable(undefined)).toBe(true);
      expect(notIterable(null)).toBe(true);
      expect(notIterable(42)).toBe(true);
      expect(notIterable({})).toBe(true);
    });
  });
});
