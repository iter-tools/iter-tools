import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__take(iterable, n) {
  if (n === 0) return;
  let i = 0;
  $await;
  for (const value of iterable) {
    yield value;
    if (++i === n) break;
  }
}

export const $take = /*#__PURE__*/ $iterableCurry($__take);
