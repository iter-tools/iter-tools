import { asyncFilterParallel, asyncToArray, range } from '../../..';

describe('asyncFilterParallel', () => {
  it('returns filtered iterable', async () => {
    const iter = asyncFilterParallel(item => item % 2 === 0, [1, 2, 3, 4, 5, 6]);
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns filtered iterable from iterable', async () => {
    const iter = asyncFilterParallel(item => item % 2 === 0, range(1, 7));
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns filtered iterable (curried version)', async () => {
    const filterEven = asyncFilterParallel((item: number) => item % 2 === 0);
    expect(await asyncToArray(filterEven(range(1, 7)))).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from null', async () => {
    expect(await asyncToArray(asyncFilterParallel((item: never) => item, null))).toEqual([]);
  });
});
