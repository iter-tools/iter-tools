import { asyncIterableCurry } from '../../internal/async-iterable';

import { asyncToArray } from '../$to-array/async-to-array';
import { cycle } from './cycle';

export async function* asyncCycle(iterable, times = Infinity) {
  yield* cycle(await iterable, times);
}

export default asyncIterableCurry(asyncCycle, {
  minArgs: 0,
  maxArgs: 1,
  validateArgs(args) {
    args[1] = asyncToArray(args[1]);
  },
});
