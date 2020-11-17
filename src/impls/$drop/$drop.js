import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $drop(iterable, n) {
  let i = 0;
  $await;
  for (const item of iterable) {
    if (i++ >= n) yield item;
  }
}

export default /*#__PURE__*/ $iterableCurry($drop);
