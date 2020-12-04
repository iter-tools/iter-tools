import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $__toArray } from '../$to-array/$to-array.js';

$async;
export function* $__joinWithSeq(source, separatorSeq) {
  const _separatorSeq = $await($__toArray(separatorSeq));
  let isFirst = true;

  $await;
  for (const value of source) {
    if (!isFirst) yield* _separatorSeq;
    yield* value;
    isFirst = false;
  }
}

export const $joinWithSeq = /*#__PURE__*/ $iterableCurry($__joinWithSeq);
