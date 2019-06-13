import { combinations } from '..';

describe('combinations', () => {
  it('returns empty', () => {
    const iter = combinations([]);
    expect(iter.getSize()).toEqual(0);
    expect(Array.from(iter)).toEqual([]);
  });

  it('returns combinations', () => {
    const iter = combinations([1, 2]);
    expect(iter.getSize()).toEqual(1);
    expect(Array.from(iter)).toEqual([[1, 2]]);
  });

  it('can be reused', () => {
    const iter = combinations([1, 2]);
    expect(Array.from(iter)).toEqual([[1, 2]]);
    expect(Array.from(iter)).toEqual([[1, 2]]);
  });

  it('returns combinations (max n)', () => {
    const iter = combinations(2, [1, 2, 3, 4]);
    expect(iter.getSize()).toEqual(6);
    const expected = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];

    expect(Array.from(iter)).toEqual(expected);
  });

  it('returns combinations 0', () => {
    const iter = combinations(0, [1, 2, 3, 4]);
    expect(iter.getSize()).toEqual(0);

    expect(Array.from(iter)).toEqual([]);
  });
});
