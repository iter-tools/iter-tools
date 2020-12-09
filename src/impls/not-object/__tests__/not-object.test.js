import { notObject } from 'iter-tools-es';

describe('notObject', () => {
  describe('when value is an object', () => {
    it('returns false', () => {
      expect(notObject({})).toBe(false);
      expect(notObject([])).toBe(false);
      expect(notObject(new Date())).toBe(false);
      expect(notObject(new (class Foo {})())).toBe(false);
    });
  });

  describe('when value is not an object', () => {
    it('returns true', () => {
      expect(notObject(null)).toBe(true);
      expect(notObject(undefined)).toBe(true);
      expect(notObject(Date)).toBe(true);
      expect(notObject(class Foo {})).toBe(true);
    });
  });
});
