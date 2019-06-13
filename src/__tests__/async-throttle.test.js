import { asyncThrottle, asyncToArray, range } from '..';

describe('asyncThrottle', () => {
  it('throttle the output', async () => {
    const iter = asyncThrottle(10, range(6));
    const t0 = Date.now();
    expect(await asyncToArray(iter)).toEqual([0, 1, 2, 3, 4, 5]);
    const t1 = Date.now();
    expect(t1 - t0).toBeGreaterThanOrEqual(40);
  });

  it('throttle the output (curried)', async () => {
    const iter = asyncThrottle(10);
    const t0 = Date.now();
    expect(await asyncToArray(iter(range(6)))).toEqual([0, 1, 2, 3, 4, 5]);
    const t1 = Date.now();
    expect(t1 - t0).toBeGreaterThanOrEqual(40);
  });

  it('returns empty output when passed null', async () => {
    expect(await asyncToArray(asyncThrottle(10, null))).toEqual([]);
  });
});
