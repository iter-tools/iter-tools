import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $toArray } from '../$to-array/$to-array';

$async;
export function* $joinWithSubseq(source, separatorSubseq) {
  const _separatorSubseq = $await($toArray(separatorSubseq));
  let isFirst = true;

  $await;
  for (const item of source) {
    if (!isFirst) yield* _separatorSubseq;
    yield* item;
    isFirst = false;
  }
}

export default $iterableCurry($joinWithSubseq);
