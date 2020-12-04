import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__map(source, func) {
  let c = 0;
  $await;
  for (const value of source) {
    yield $await(func(value, c++));
  }
}

export const $map = /*#__PURE__*/ $iterableCurry($__map);
