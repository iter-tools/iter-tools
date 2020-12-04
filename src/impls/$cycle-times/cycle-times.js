import { iterableCurry } from '../../internal/iterable.js';
import { __toArray } from '../$to-array/to-array.js';

export function* __cycleTimes(source, n) {
  const arr = Array.isArray(source) ? source : __toArray(source);
  if (!arr.length) return;

  while (n--) {
    yield* arr;
  }
}

export const cycleTimes = /*#__PURE__*/ iterableCurry(__cycleTimes);
