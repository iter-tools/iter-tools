import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function* $tap(source, callback) {
  let c = 0;
  $await;
  for (const item of source) {
    callback(item, c++);
    yield item;
  }
}

export default /*#__PURE__*/ $iterableCurry($tap);
