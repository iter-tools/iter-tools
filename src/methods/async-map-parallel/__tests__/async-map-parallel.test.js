import delay from '../../../internal/delay';
import { asyncMapParallel, asyncToArray, range } from '../../..';

describe('asyncMapParallel', () => {
  it('returns mapped iterable', async () => {
    const iter = asyncMapParallel(item => item * 2, [1, 2, 3]);
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns mapped iterable (using a promise)', async () => {
    const iter = asyncMapParallel(item => Promise.resolve(item * 2), [1, 2, 3]);
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns mapped iterable from iterable', async () => {
    const iter = asyncMapParallel(item => item * 2, range({ start: 1, end: 4 }));
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('maps concurrently', async () => {
    const iter = asyncMapParallel(2, item => item * 2, range({ start: 1, end: 4 }));
    expect(await asyncToArray(iter)).toEqual([2, 4, 6]);
  });

  it('returns mapped iterable (curried version)', async () => {
    const iter = asyncMapParallel(item => item * 2);
    expect(await asyncToArray(iter(range({ start: 1, end: 4 })))).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from null', async () => {
    expect(await asyncToArray(asyncMapParallel(item => item * 2, null))).toEqual([]);
  });

  it('maps concurrently (check how many)', async () => {
    const desiredConcurrency = 3;
    let concurrency = 0;

    const iter = asyncMapParallel(
      desiredConcurrency,
      async (item, i) => {
        concurrency++;

        await delay(Math.min(desiredConcurrency, i + 1) * 50);
        return concurrency--;
      },
      range(10),
    );
    expect(await asyncToArray(iter)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 2, 1]);
  });
});
