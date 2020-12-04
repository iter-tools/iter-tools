import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $__dropWhile(source, predicate) {
  let drop = true;
  let c = 0;
  $await;
  for (const value of source) {
    if (!drop) {
      yield value;
    } else {
      drop = $await(predicate(value, c++));
      if (!drop) {
        yield value;
      }
    }
  }
}

export const $dropWhile = /*#__PURE__*/ $iterableCurry($__dropWhile);
