import { notAsyncWrappable } from 'iter-tools-es';

describe('notAsyncWrappable', () => {
  describe('when value can be used with asyncWrap', () => {
    it('returns false', () => {
      expect(notAsyncWrappable((async function* () {})())).toBe(false);
      expect(notAsyncWrappable((function* () {})())).toBe(false);
      expect(notAsyncWrappable([])).toBe(false);
      expect(notAsyncWrappable(undefined)).toBe(false);
      expect(notAsyncWrappable(null)).toBe(false);
    });
  });

  describe('when value cannot be used with asyncWrap', () => {
    it('returns true', () => {
      expect(notAsyncWrappable({})).toBe(true);
      expect(notAsyncWrappable(4)).toBe(true);
    });
  });
});
