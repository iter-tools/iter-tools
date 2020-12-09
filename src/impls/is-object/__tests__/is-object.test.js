import { isObject } from 'iter-tools-es';

describe('isObject', () => {
  describe('when value is an object', () => {
    it('returns true', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject(new (class Foo {})())).toBe(true);
    });
  });

  describe('when value is not an object', () => {
    it('returns false', () => {
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
      expect(isObject(Date)).toBe(false);
      expect(isObject(class Foo {})).toBe(false);
    });
  });
});
