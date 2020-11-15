import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $toArray } from '../$to-array/$to-array';

$async;
export function* $joinWithSeq(source, separatorSeq) {
  const _separatorSeq = $await($toArray(separatorSeq));
  let isFirst = true;

  $await;
  for (const item of source) {
    if (!isFirst) yield* _separatorSeq;
    yield* item;
    isFirst = false;
  }
}

export default $iterableCurry($joinWithSeq);
