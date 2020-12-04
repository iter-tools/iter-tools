import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__take(iterable, n) {
  let i = 0;
  $await;
  for (const value of iterable) {
    if (i++ === n) break;
    yield value;
  }
}

export const $take = /*#__PURE__*/ $iterableCurry($__take);
