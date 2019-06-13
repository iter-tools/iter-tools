import { product } from '..';

describe('product', () => {
  it('returns empty', () => {
    const iter = product();
    expect(iter.getSize()).toEqual(0);
    expect(Array.from(iter)).toEqual([]);
  });

  it('returns single', () => {
    const iter = product([1, 2, 3]);
    expect(iter.getSize()).toEqual(3);
    expect(Array.from(iter)).toEqual([[1], [2], [3]]);
  });

  it('can be reused', () => {
    const iter = product([1, 2, 3]);
    expect(Array.from(iter)).toEqual([[1], [2], [3]]);
    expect(Array.from(iter)).toEqual([[1], [2], [3]]);
  });

  it('returns double', () => {
    const iter = product([1, 2], [3, 4]);
    expect(iter.getSize()).toEqual(4);
    expect(Array.from(iter)).toEqual([[1, 3], [1, 4], [2, 3], [2, 4]]);
  });

  it('returns with repeat', () => {
    const iter = product([1, 2], [1, 2]);
    expect(iter.getSize()).toEqual(4);
    expect(Array.from(iter)).toEqual([[1, 1], [1, 2], [2, 1], [2, 2]]);
  });

  it('returns triple', () => {
    const iter = product([1, 2], [3, 4], [5, 6]);
    expect(iter.getSize()).toEqual(8);
    expect(Array.from(iter)).toEqual([
      [1, 3, 5],
      [1, 3, 6],
      [1, 4, 5],
      [1, 4, 6],
      [2, 3, 5],
      [2, 3, 6],
      [2, 4, 5],
      [2, 4, 6],
    ]);
  });
});
