import { notLoopable } from 'iter-tools-es';

describe('notLoopable', () => {
  describe('when value has Symbol.iterator', () => {
    it('returns false', () => {
      expect(notLoopable([])).toBe(false);
      expect(notLoopable(new Map())).toBe(false);
      expect(notLoopable(new Set())).toBe(false);
      expect(notLoopable({ [Symbol.iterator]: null })).toBe(false);
    });
  });

  describe('when value does not have Symbol.iterator', () => {
    it('returns true', () => {
      expect(notLoopable(undefined)).toBe(true);
      expect(notLoopable(null)).toBe(true);
      expect(notLoopable(42)).toBe(true);
      expect(notLoopable({})).toBe(true);
    });
  });
});
