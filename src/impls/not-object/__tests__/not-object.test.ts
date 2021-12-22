import { notObject } from 'iter-tools-es';

describe('notObject', () => {
  describe('when value is an object', () => {
    it('returns false', () => {
      expect(notObject({})).toBe(false as const);
      expect(notObject([])).toBe(false as const);
      expect(notObject(new Date())).toBe(false as const);
      expect(notObject(new (class Foo {})())).toBe(false as const);
    });
  });

  describe('when value is not an object', () => {
    it('returns true', () => {
      expect(notObject(null)).toBe(true as const);
      expect(notObject(undefined)).toBe(true as const);
      expect(notObject(Date)).toBe(true as const);
      expect(notObject(class Foo {})).toBe(true as const);
    });
  });
});
