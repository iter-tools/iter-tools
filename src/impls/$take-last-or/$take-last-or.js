import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';

$async;
export function $takeLastOr(iterable, whenEmpty) {
  let _item = whenEmpty;

  $await;
  for (const item of iterable) {
    _item = item;
  }

  return _item;
}

export default /*#__PURE__*/ $iterableCurry($takeLastOr, {
  reduces: true,
});
