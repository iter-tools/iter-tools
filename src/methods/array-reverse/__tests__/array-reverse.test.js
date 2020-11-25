import { arrayReverse, toArray } from '../../..';

describe('arrayReverse', () => {
  describe('when source is empty', () => {
    it('yields nothing', () => {
      expect(toArray(arrayReverse(null))).toEqual([]);
      expect(toArray(arrayReverse(undefined))).toEqual([]);
      expect(toArray(arrayReverse([]))).toEqual([]);
    });
  });

  describe('when source is an array', () => {
    it('yields array values in reverse order', () => {
      expect(toArray(arrayReverse([1, 2, 3]))).toEqual([3, 2, 1]);
    });
  });

  describe('when source is a string', () => {
    it('yields characters in reverse order', () => {
      expect(toArray(arrayReverse('abc'))).toEqual(['c', 'b', 'a']);
    });
  });

  describe('when input is invalid', () => {
    it('throws', () => {
      const source: any = 0;
      expect(() => toArray(arrayReverse(source))).toThrowErrorMatchingSnapshot();
    });
  });
});
