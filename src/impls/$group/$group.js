import { $iterableCurry } from '../../internal/$iterable.js';
import { $__groupBy } from '../$group-by/$group-by.js';

export function $__group(iterable) {
  return $__groupBy(iterable, (_) => _);
}

export const $group = /*#__PURE__*/ $iterableCurry($__group);
