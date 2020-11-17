import { asyncIterableCurry } from '../../internal/async-iterable.js';

import { asyncToArray } from '../$to-array/async-to-array.js';
import { cycleTimes } from './cycle-times.js';

export async function* asyncCycleTimes(source, n) {
  yield* cycleTimes(await source, n);
}

export default /*#__PURE__*/ asyncIterableCurry(asyncCycleTimes, {
  validateArgs(args) {
    args[1] = asyncToArray(args[1]);
  },
});
