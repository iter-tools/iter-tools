import { $iterableCurry } from '../../internal/$iterable.js';
import { $__cycleTimes } from '../$cycle-times/$cycle-times.js';

export function $__cycle(source) {
  return $__cycleTimes(source, Infinity);
}

export const $cycle = /*#__PURE__*/ $iterableCurry($__cycle);
