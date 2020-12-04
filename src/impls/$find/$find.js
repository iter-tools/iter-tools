import { $iterableCurry } from '../../internal/$iterable.js';
import { $__findOr } from '../$find-or/$find-or.js';

export function $__find(iterable, predicate) {
  return $__findOr(iterable, undefined, predicate);
}

export const $find = /*#__PURE__*/ $iterableCurry($__find, {
  reduces: true,
});
