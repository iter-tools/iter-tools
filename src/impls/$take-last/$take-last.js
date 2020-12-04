import { $iterableCurry } from '../../internal/$iterable.js';
import { $__takeLastOr } from '../$take-last-or/$take-last-or.js';

export function $__takeLast(iterable) {
  return $__takeLastOr(iterable, undefined);
}

export const $takeLast = /*#__PURE__*/ $iterableCurry($__takeLast, {
  reduces: true,
});
