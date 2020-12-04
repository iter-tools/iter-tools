import { $iterableCurry } from '../../internal/$iterable.js';
import { $GroupsIterator } from '../../internal/$groups-iterator.js';
import { $__map } from '../$map/$map.js';
import { $__wrap } from '../$wrap/$wrap.js';

export function $__spliterateGrouped(source, strategy, options = {}) {
  return new $GroupsIterator(source, strategy, options);
}

export const $spliterateGrouped = /*#__PURE__*/ $iterableCurry(
  function $spliterateGrouped(...args) {
    return $__map($__spliterateGrouped(...args), $__wrap);
  },
  {
    minArgs: 1,
    maxArgs: 2,
    growRight: true,
  },
);
