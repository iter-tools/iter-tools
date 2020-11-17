import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $filter(source, predicate) {
  let c = 0;
  $await;
  for (const item of source) {
    if ($await(predicate(item, c++))) {
      yield item;
    }
  }
}

export default /*#__PURE__*/ $iterableCurry($filter);
