import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__map } from '../$map/$map.js';

$async;
export function* $__flatMap(source, func) {
  $await;
  for (const value of $__map(source, func)) {
    yield* value;
  }
}

export const $flatMap = /*#__PURE__*/ $iterableCurry($__flatMap);
