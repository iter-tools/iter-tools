import { permutations } from '../../..';

describe('permutations', () => {
  it('returns empty', () => {
    const iter = permutations([]);
    expect(iter.size).toEqual(0);
    expect(Array.from(iter)).toEqual([]);
  });

  it('returns permutations', () => {
    const iter = permutations(2, [1, 2]);
    expect(iter.size).toEqual(2);
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]]);
  });

  it('can be reused', () => {
    const iter = permutations([1, 2]);
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]]);
    expect(Array.from(iter)).toEqual([[1, 2], [2, 1]]);
  });

  it('returns permutations', () => {
    const iter = permutations(2, [1, 2, 3, 4]);
    expect(iter.size).toEqual(12);
    const expected = [
      [1, 2],
      [1, 3],
      [1, 4],
      [2, 1],
      [2, 3],
      [2, 4],
      [3, 1],
      [3, 2],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3],
    ];

    expect(Array.from(iter)).toEqual(expected);
  });
});
