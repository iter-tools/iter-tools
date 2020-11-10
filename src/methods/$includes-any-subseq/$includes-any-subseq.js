import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $subseqsToArray } from '../../internal/$any-subseq';
import { $leadingWindow } from '../$leading-window/$leading-window';
import { startsWithAnySubseq } from '../$starts-with-any-subseq/starts-with-any-subseq';

$async;
export function $includesAnySubseq(iterable, subseqs) {
  const subseqsArr = $await($subseqsToArray(subseqs));

  if (!subseqsArr.length) return false;
  if (subseqsArr.find(subseq => !subseq.length)) return true;

  const maxMatchLength = subseqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (startsWithAnySubseq(buffer, subseqsArr)) {
      return true;
    }
  }
  return false;
}

export default $iterableCurry($includesAnySubseq, {
  reduces: true,
});
