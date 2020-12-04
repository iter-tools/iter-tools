import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__drop(iterable, n) {
  let i = 0;
  $await;
  for (const value of iterable) {
    if (i++ >= n) yield value;
  }
}

export const $drop = /*#__PURE__*/ $iterableCurry($__drop);
