import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $some(iterable, func) {
  let c = 0;
  $await;
  for (const value of iterable) {
    if ($await(func(value, c++))) {
      return true;
    }
  }
  return false;
}

export default /*#__PURE__*/ $iterableCurry($some, { reduces: true });
