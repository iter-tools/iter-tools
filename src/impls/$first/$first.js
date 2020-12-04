import { $iterableCurry } from '../../internal/$iterable.js';
import { $__firstOr } from '../$first-or/$first-or.js';

export function $__first(iterable) {
  return $__firstOr(iterable, undefined);
}

export const $first = /*#__PURE__*/ $iterableCurry($__first, {
  reduces: true,
});
