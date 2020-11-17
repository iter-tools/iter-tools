import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { isInteger } from '../../internal/number.js';
import { delay } from '../../internal/delay.js';

export async function* asyncThrottle(source, intervalMs) {
  let waitSince = 0;
  for await (const item of source) {
    const duration = intervalMs - (Date.now() - waitSince);
    await (duration > 0 && delay(duration));
    waitSince = Date.now();
    yield item;
  }
}

export default /*#__PURE__*/ asyncIterableCurry(asyncThrottle, {
  validateArgs([intervalMs]) {
    if (!isInteger(intervalMs) || intervalMs <= 0) {
      throw new Error('The first argument (intervalMs) should be a number greater than 0');
    }
  },
});
