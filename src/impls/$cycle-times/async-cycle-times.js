import { asyncIterableCurry } from '../../internal/async-iterable.js';

import { __asyncToArray } from '../$to-array/async-to-array.js';
import { __cycleTimes } from './cycle-times.js';

export async function* __asyncCycleTimes(source, n) {
  yield* __cycleTimes(await __asyncToArray(source), n);
}

export const asyncCycleTimes = /*#__PURE__*/ asyncIterableCurry(__asyncCycleTimes);
