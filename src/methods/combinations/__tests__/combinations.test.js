import { combinations } from '../../..';

describe('combinations', () => {
  it('returns empty', () => {
    expect(Array.from(combinations([]))).toEqual([]);
  });

  it('returns empty when combination size is 0', () => {
    expect(Array.from(combinations(0, [1, 2, 3, 4]))).toEqual([]);
  });

  it('returns combinations', () => {
    expect(Array.from(combinations([1, 2]))).toEqual([[1, 2]]);
  });

  it('can be reused', () => {
    const iter = combinations([1, 2]);
    expect(Array.from(iter)).toEqual([[1, 2]]);
    expect(Array.from(iter)).toEqual([[1, 2]]);
  });

  it('returns combinations (max n)', () => {
    const iter = combinations(2, [1, 2, 3, 4]);
    const expected = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];

    expect(Array.from(iter)).toEqual(expected);
  });

  it('returns combinations 0', () => {
    const iter = combinations(0, [1, 2, 3, 4]);
    expect(iter.size).toEqual(0);

    expect(Array.from(iter)).toEqual([]);
  });

  describe('combinations.size', () => {
    it('is 0 when there is nothing to permute', () => {
      expect(combinations([]).size).toBe(0);
    });

    it('is 0 when combination size is 0', () => {
      expect(combinations(0, new Array(4)).size).toBe(0);
    });

    it('works in common cases', () => {
      expect(combinations(new Array(2)).size).toBe(1);
      expect(combinations(2, new Array(4)).size).toBe(6);
      expect(combinations(2, new Array(10)).size).toBe(45);
    });

    it('works when intermediate computations would overflow doubles', () => {
      expect(combinations(4, new Array(1000)).size).toBe(41417124750);
    });
  });
});
