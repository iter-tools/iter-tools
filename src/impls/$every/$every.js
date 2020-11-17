import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $every(iterable, predicate) {
  let c = 0;
  $await;
  for (const item of iterable) {
    if (!$await(predicate(item, c++))) {
      return false;
    }
  }
  return true;
}

export default /*#__PURE__*/ $iterableCurry($every, { reduces: true });
