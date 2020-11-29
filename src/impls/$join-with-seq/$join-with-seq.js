import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $toArray } from '../$to-array/$to-array.js';

$async;
export function* $joinWithSeq(source, separatorSeq) {
  const _separatorSeq = $await($toArray(separatorSeq));
  let isFirst = true;

  $await;
  for (const value of source) {
    if (!isFirst) yield* _separatorSeq;
    yield* value;
    isFirst = false;
  }
}

export default /*#__PURE__*/ $iterableCurry($joinWithSeq);
