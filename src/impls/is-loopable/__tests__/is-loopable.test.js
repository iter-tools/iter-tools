import { isLoopable } from 'iter-tools-es';

describe('isLoopable', () => {
  describe('when value has Symbol.iterator', () => {
    it('returns true', () => {
      expect(isLoopable([])).toBe(true);
      expect(isLoopable(new Map())).toBe(true);
      expect(isLoopable(new Set())).toBe(true);
      expect(isLoopable({ [Symbol.iterator]: null })).toBe(true);
    });
  });

  describe('when value does not have Symbol.iterator', () => {
    it('returns false', () => {
      expect(isLoopable(undefined)).toBe(false);
      expect(isLoopable(null)).toBe(false);
      expect(isLoopable(42)).toBe(false);
      expect(isLoopable({})).toBe(false);
    });
  });
});
