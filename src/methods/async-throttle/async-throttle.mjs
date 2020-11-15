import { asyncIterableCurry } from '../../internal/async-iterable';
import { isInteger } from '../../internal/number';
import delay from '../../internal/delay';

export async function* asyncThrottle(source, intervalMs) {
  let waitSince = 0;
  for await (const item of source) {
    const duration = intervalMs - (Date.now() - waitSince);
    await (duration > 0 && delay(duration));
    waitSince = Date.now();
    yield item;
  }
}

export default asyncIterableCurry(asyncThrottle, {
  validateArgs([intervalMs]) {
    if (!isInteger(intervalMs) || intervalMs <= 0) {
      throw new Error('The first argument (intervalMs) should be a number greater than 0');
    }
  },
});
