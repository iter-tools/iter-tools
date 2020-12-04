import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__filter(source, predicate) {
  let c = 0;
  $await;
  for (const value of source) {
    if ($await(predicate(value, c++))) {
      yield value;
    }
  }
}

export const $filter = /*#__PURE__*/ $iterableCurry($__filter);
