import { $iterableCurry } from '../../internal/$iterable.js';
import { $__splitGroupsBy } from '../$split-groups-by/$split-groups-by.js';

export function $__splitGroups(iterable) {
  return $__splitGroupsBy(iterable, (_) => _);
}

export const $splitGroups = /*#__PURE__*/ $iterableCurry($__splitGroups);
