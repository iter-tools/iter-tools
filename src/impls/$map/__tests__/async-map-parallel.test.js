import { delay } from '../../../internal/delay.js';
import { asyncMapParallel } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncMapParallel', () => {
  it('returns mapped iterable', async () => {
    const iter = asyncMapParallel((value) => value * 2, asyncWrap([1, 2, 3]));
    expect(await asyncUnwrap(iter)).toEqual([2, 4, 6]);
  });

  it('maps concurrently', async () => {
    const iter = asyncMapParallel(2, async (value) => value * 2, asyncWrap([1, 2, 3]));
    expect(await asyncUnwrap(iter)).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from empty iterable', async () => {
    expect(await asyncUnwrap(asyncMapParallel(async (value: any) => value * 2, null))).toEqual([]);
    expect(await asyncUnwrap(asyncMapParallel(async (value: any) => value * 2, undefined))).toEqual(
      [],
    );
  });

  it('maps concurrently (check how many)', async () => {
    const desiredConcurrency = 3;
    let concurrency = 0;

    const iter = asyncMapParallel(
      desiredConcurrency,
      async (value, i) => {
        concurrency++;

        await delay(Math.min(desiredConcurrency, i + 1) * 50);
        return concurrency--;
      },
      asyncWrap([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
    );
    expect(await asyncUnwrap(iter)).toEqual([3, 3, 3, 3, 3, 3, 3, 3, 2, 1]);
  });
});
