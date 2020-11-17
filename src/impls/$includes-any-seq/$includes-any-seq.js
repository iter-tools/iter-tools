import { $async, $await } from '../../../generate/async.macro.cjs';

import { $iterableCurry } from '../../internal/$iterable.js';
import { $seqsToArray } from '../../internal/$any-seq.js';
import { $leadingWindow } from '../$leading-window/$leading-window.js';
import { startsWithAnySeq } from '../$starts-with-any-seq/starts-with-any-seq.js';

$async;
export function $includesAnySeq(iterable, seqs) {
  const seqsArr = $await($seqsToArray(seqs));

  if (!seqsArr.length) return false;
  if (seqsArr.find((seq) => !seq.length)) return true;

  const maxMatchLength = seqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (startsWithAnySeq(buffer, seqsArr)) {
      return true;
    }
  }
  return false;
}

export default /*#__PURE__*/ $iterableCurry($includesAnySeq, {
  reduces: true,
});
