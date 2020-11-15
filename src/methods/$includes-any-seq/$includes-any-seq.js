import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $seqsToArray } from '../../internal/$any-seq';
import { $leadingWindow } from '../$leading-window/$leading-window';
import { startsWithAnySeq } from '../$starts-with-any-seq/starts-with-any-seq';

$async;
export function $includesAnySeq(iterable, seqs) {
  const seqsArr = $await($seqsToArray(seqs));

  if (!seqsArr.length) return false;
  if (seqsArr.find(seq => !seq.length)) return true;

  const maxMatchLength = seqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (startsWithAnySeq(buffer, seqsArr)) {
      return true;
    }
  }
  return false;
}

export default $iterableCurry($includesAnySeq, {
  reduces: true,
});
