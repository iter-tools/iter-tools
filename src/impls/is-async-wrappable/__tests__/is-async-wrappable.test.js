import { isAsyncWrappable } from 'iter-tools-es';

describe('isAsyncWrappable', () => {
  describe('when value can be used with asyncWrap', () => {
    it('returns true', () => {
      expect(isAsyncWrappable((async function* () {})())).toBe(true);
      expect(isAsyncWrappable((function* () {})())).toBe(true);
      expect(isAsyncWrappable([])).toBe(true);
      expect(isAsyncWrappable(undefined)).toBe(true);
      expect(isAsyncWrappable(null)).toBe(true);
    });
  });

  describe('when value cannot be used with asyncWrap', () => {
    it('returns false', () => {
      expect(isAsyncWrappable({})).toBe(false);
      expect(isAsyncWrappable(4)).toBe(false);
    });
  });
});
