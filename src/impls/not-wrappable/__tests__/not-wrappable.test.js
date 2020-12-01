import { notWrappable } from 'iter-tools-es';

describe('notWrappable', () => {
  describe('when value can be an input to wrap', () => {
    it('returns false', () => {
      expect(notWrappable([])).toBe(false);
      expect(notWrappable(undefined)).toBe(false);
      expect(notWrappable(null)).toBe(false);
    });
  });

  describe('when value cannot be an input to wrap', () => {
    it('returns true', () => {
      expect(notWrappable({})).toBe(true);
    });
  });
});
