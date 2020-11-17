import { combinationsWithReplacement } from '@iter-tools/es';

describe('combinationsWithReplacement', () => {
  it('returns empty', () => {
    expect(Array.from(combinationsWithReplacement([]))).toEqual([]);
  });

  it('returns empty when combination size is 0', () => {
    expect(Array.from(combinationsWithReplacement(0, [1, 2, 3, 4]))).toEqual([]);
  });

  it('returns combinationsWithReplacement', () => {
    expect(Array.from(combinationsWithReplacement([1, 2]))).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
  });

  it('can be reused', () => {
    const iter = combinationsWithReplacement([1, 2]);
    expect(Array.from(iter)).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
    expect(Array.from(iter)).toEqual([
      [1, 1],
      [1, 2],
      [2, 2],
    ]);
  });

  it('returns combinationsWithReplacement (max n)', () => {
    const iter = combinationsWithReplacement(2, [1, 2, 3, 4]);
    const expected = [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 2],
      [2, 3],
      [2, 4],
      [3, 3],
      [3, 4],
      [4, 4],
    ];

    expect(Array.from(iter)).toEqual(expected);
  });

  describe('combinationsWithReplacement.size', () => {
    it('is 0 when there is nothing to permute', () => {
      expect(combinationsWithReplacement([]).size).toBe(0);
    });

    it('is 0 when combination size is 0', () => {
      expect(combinationsWithReplacement(0, new Array(4)).size).toBe(0);
    });

    it('works in common cases', () => {
      expect(combinationsWithReplacement(new Array(2)).size).toEqual(3);
      expect(combinationsWithReplacement(2, new Array(4)).size).toEqual(10);
      expect(combinationsWithReplacement(2, new Array(10)).size).toEqual(55);
    });

    it('works when intermediate computations would overflow doubles', () => {
      expect(combinationsWithReplacement(4, new Array(1000)).size).toEqual(41917125250); // NaN using doubles
    });
  });
});
