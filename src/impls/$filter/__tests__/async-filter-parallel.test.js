import { asyncFilterParallel } from '@iter-tools/es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('asyncFilterParallel', () => {
  it('returns filtered iterable', async () => {
    const iter = asyncFilterParallel((item) => item % 2 === 0, asyncWrap([1, 2, 3, 4, 5, 6]));
    expect(await asyncUnwrap(iter)).toEqual([2, 4, 6]);
  });

  it('returns empty iterable from null', async () => {
    expect(await asyncUnwrap(asyncFilterParallel((item: any) => item, null))).toEqual([]);
    expect(await asyncUnwrap(asyncFilterParallel((item: any) => item, undefined))).toEqual([]);
  });
});
