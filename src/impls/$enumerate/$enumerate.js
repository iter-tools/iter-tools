import { $iterableCurry } from '../../internal/$iterable.js';
import { $__map } from '../$map/$map.js';

export function $__enumerate(source, start = 0) {
  return $__map(source, (value, i) => [start + i, value]);
}

export const $enumerate = /*#__PURE__*/ $iterableCurry($__enumerate, {
  minArgs: 0,
  maxArgs: 1,
});
