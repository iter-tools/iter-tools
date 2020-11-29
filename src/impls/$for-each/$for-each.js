import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $forEach(iterable, callback) {
  let c = 0;
  $await;
  for (const value of iterable) {
    $await(callback(value, c++));
  }
}

export default /*#__PURE__*/ $iterableCurry($forEach, {
  reduces: true,
});
