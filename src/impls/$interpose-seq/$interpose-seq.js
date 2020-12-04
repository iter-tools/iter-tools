import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $cache } from '../../internal/$iterable.js';

$async;
export function* $__interposeSeq(source, seq) {
  const subseq_ = $await($cache(seq));

  let first = true;
  $await;
  for (const sourceValue of source) {
    if (!first) yield* subseq_;
    yield sourceValue;
    first = false;
  }
}

export const $interposeSeq = /*#__PURE__*/ $iterableCurry($__interposeSeq);
