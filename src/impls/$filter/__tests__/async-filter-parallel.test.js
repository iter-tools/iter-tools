import { asyncFilterParallel } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncFilterParallel', () => {
  it('returns filtered iterable', async () => {
    const iter = asyncFilterParallel((value) => value % 2 === 0, asyncWrap([1, 2, 3, 4, 5, 6]));
    expect(await asyncUnwrap(iter)).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from null', async () => {
    expect(await asyncUnwrap(asyncFilterParallel((value: any) => value, null))).toEqual([]);
    expect(await asyncUnwrap(asyncFilterParallel((value: any) => value, undefined))).toEqual([]);
  });
});
