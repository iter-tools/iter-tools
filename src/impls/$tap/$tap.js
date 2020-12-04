import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__tap(source, callback) {
  let c = 0;
  $await;
  for (const value of source) {
    callback(value, c++);
    yield value;
  }
}

export const $tap = /*#__PURE__*/ $iterableCurry($__tap);
