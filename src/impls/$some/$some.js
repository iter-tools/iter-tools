import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__some(iterable, func) {
  let c = 0;
  $await;
  for (const value of iterable) {
    if ($await(func(value, c++))) {
      return true;
    }
  }
  return false;
}

export const $some = /*#__PURE__*/ $iterableCurry($__some, { reduces: true });
