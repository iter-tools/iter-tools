import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $drop(iterable, n) {
  let i = 0;
  $await;
  for (const value of iterable) {
    if (i++ >= n) yield value;
  }
}

export default /*#__PURE__*/ $iterableCurry($drop);
