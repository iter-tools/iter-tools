import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $seqsToArray } from '../../internal/$any-seq.js';
import { $__windowAhead } from '../$window-ahead/$window-ahead.js';
import { __startsWithAnySeq } from '../$starts-with-any-seq/starts-with-any-seq.js';

$async;
export function $__includesAnySeq(iterable, seqs, same = Object.is) {
  const seqsArr = $await($seqsToArray(seqs));

  if (!seqsArr.length) return false;
  if (seqsArr.find((seq) => !seq.length)) return true;

  const maxMatchLength = seqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  $await;
  for (const buffer of $__windowAhead(iterable, maxMatchLength)) {
    if (__startsWithAnySeq(buffer, seqsArr, same)) {
      return true;
    }
  }
  return false;
}

export const $includesAnySeq = /*#__PURE__*/ $iterableCurry($__includesAnySeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
});
