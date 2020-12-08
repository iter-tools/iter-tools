import { $ensureIterable } from '../../internal/$iterable.js';
import { curry } from '../../internal/curry.js';
import { $__zip } from '../$zip/$zip.js';
import { $__filter } from '../$filter/$filter.js';
import { $__map } from '../$map/$map.js';

export function $__compress(source, included) {
  return $__map(
    $__filter($__zip([source, included]), ([, isIncluded]) => isIncluded),
    ([value]) => value,
  );
}

export const $compress = /*#__PURE__*/ curry(function $compress(source, included) {
  return $__compress($ensureIterable(source), $ensureIterable(included));
});
