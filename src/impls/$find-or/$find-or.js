import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $findOr(iterable, notFoundValue, func) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if ($await(func(item, c++))) {
      return item;
    }
  }
  return notFoundValue;
}

export default /*#__PURE__*/ $iterableCurry($findOr, {
  reduces: true,
});
