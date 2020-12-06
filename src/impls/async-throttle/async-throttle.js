import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { isPositiveInteger } from '../../internal/number.js';
import { delay } from '../../internal/delay.js';

export async function* __asyncThrottle(source, intervalMs) {
  let waitSince = 0;
  for await (const value of source) {
    const duration = intervalMs - (Date.now() - waitSince);
    await (duration > 0 && delay(duration));
    waitSince = Date.now();
    yield value;
  }
}

export const asyncThrottle = /*#__PURE__*/ asyncIterableCurry(__asyncThrottle, {
  validateArgs(args) {
    if (!isPositiveInteger(args[1], true)) {
      throw new Error('intervalMs argument to asyncThrottle must be a number > 0');
    }
  },
});
