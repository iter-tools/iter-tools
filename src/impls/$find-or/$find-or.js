import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $findOr(iterable, notFoundValue, func) {
  let c = 0;
  $await;
  for (const value of iterable) {
    if ($await(func(value, c++))) {
      return value;
    }
  }
  return notFoundValue;
}

export default /*#__PURE__*/ $iterableCurry($findOr, {
  reduces: true,
});
