import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $dropWhile(source, predicate) {
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

export default /*#__PURE__*/ $iterableCurry($dropWhile);
