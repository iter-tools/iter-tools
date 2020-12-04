import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $__forEach(iterable, callback) {
  let c = 0;
  $await;
  for (const value of iterable) {
    $await(callback(value, c++));
  }
}

export const $forEach = /*#__PURE__*/ $iterableCurry($__forEach, {
  reduces: true,
});
