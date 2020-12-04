import { $iterableCurry } from '../../internal/$iterable.js';
import { $__map } from '../$map/$map.js';

function* iterableOf(value) {
  yield value;
}

export function $__split(source) {
  return $__map(source, (value) => iterableOf(value));
}

export const $split = /*#__PURE__*/ $iterableCurry($__split);
