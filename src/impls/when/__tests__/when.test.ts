import { when } from 'iter-tools-es';

const obj = { foo: 'foo' };
const iterable = ['foo'];

describe('when', () => {
  describe('when condition is false', () => {
    it('the result can be treated as an object', () => {
      expect(when(false, null)).toEqual({});
    });

    it('the result can be treated as an iterable', () => {
      expect(Array.from(when(false, iterable))).toEqual([]);
    });
  });

  describe('when condition is true', () => {
    it('and value is object', () => {
      expect(when(true, obj)).toBe(obj);
    });

    it('and value is iterable', () => {
      expect(when(true, iterable)).toBe(iterable);
    });

    describe('and value is null or undefined', () => {
      it('the result can be treated as an object', () => {
        expect(when(true, null)).toEqual({});
        expect(when(true, undefined)).toEqual({});
      });

      it('the result can be treated as an iterable', () => {
        expect(Array.from(when(true, null))).toEqual([]);
        expect(Array.from(when(true, undefined))).toEqual([]);
      });
    });
  });

  describe('when value is a funciton', () => {
    it('is called to produce the value to be spread', () => {
      expect(when(true, () => iterable)).toBe(iterable);
    });
  });

  it('throws when value is not object or iterable', () => {
    expect(() => {
      const bad: any = 4;
      when(true, bad);
    }).toThrowErrorMatchingInlineSnapshot(
      `"Second argument to when must be an object, iterable, or function."`,
    );
  });
});
