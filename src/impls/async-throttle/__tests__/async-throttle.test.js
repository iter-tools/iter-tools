import { asyncThrottle } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap, anyType } from '../../../test/async-helpers.js';

describe('asyncThrottle', () => {
  it('throttle the output', async () => {
    const iter = asyncThrottle(10, asyncWrap([0, 1, 2, 3, 4, 5]));
    const t0 = Date.now();
    expect(await asyncUnwrap(iter)).toEqual([0, 1, 2, 3, 4, 5]);
    const t1 = Date.now();
    expect(t1 - t0).toBeGreaterThanOrEqual(40);
  });

  it('returns empty output when passed null', async () => {
    expect(await asyncUnwrap(asyncThrottle(10, null))).toEqual([]);
  });

  describe('when interval is invalid', () => {
    it('throws', async () => {
      expect(() => asyncThrottle(0, null)).toThrowErrorMatchingSnapshot();
      expect(() => asyncThrottle(anyType(null), null)).toThrowErrorMatchingSnapshot();
    });
  });
});
