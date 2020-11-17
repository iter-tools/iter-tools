import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $takeWhile(source, predicate) {
  let take = true;
  let c = 0;

  $await;
  for (const item of source) {
    take = $await(predicate(item, c++));
    if (take) {
      yield item;
    } else {
      break;
    }
  }
}

export default /*#__PURE__*/ $iterableCurry($takeWhile);
