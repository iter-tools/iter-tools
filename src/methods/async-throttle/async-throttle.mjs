import { asyncIterableCurry } from '../../internal/async-iterable';
import delay from '../../internal/delay';

export async function* asyncThrottle(iterable, ms) {
  let waitSince = 0;
  for await (const item of iterable) {
    const duration = ms - (Date.now() - waitSince);
    await (duration > 0 && delay(duration));
    waitSince = Date.now();
    yield item;
  }
}

export default asyncIterableCurry(asyncThrottle, {
  validateArgs([ms]) {
    if (typeof ms !== 'number' || ms <= 0) {
      throw new Error('The first argument (ms) should be a number greater than 0');
    }
  },
});
