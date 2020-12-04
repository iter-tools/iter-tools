import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__takeWhile(source, predicate) {
  let take = true;
  let c = 0;

  $await;
  for (const value of source) {
    take = $await(predicate(value, c++));
    if (take) {
      yield value;
    } else {
      break;
    }
  }
}

export const $takeWhile = /*#__PURE__*/ $iterableCurry($__takeWhile);
