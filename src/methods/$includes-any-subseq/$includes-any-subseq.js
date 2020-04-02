import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $ensureSubseqs } from '../../internal/$ensure-subseqs';
import { $leadingWindow } from '../$leading-window/$leading-window';
import { startsWithAnySubseq } from '../$starts-with-any-subseq/starts-with-any-subseq';

$async;
export function $includesAnySubseq(iterable, valueSubseqs, compareEquality = Object.is) {
  const valueArrays = $await($ensureSubseqs(valueSubseqs));
  const maxMatchLength = valueArrays.reduce((max, { length }) => Math.max(max, length), 1);
  let hasItems = false;

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (startsWithAnySubseq(buffer, valueArrays, compareEquality)) {
      return true;
    }
    hasItems = true;
  }
  return !hasItems && !!valueArrays.find(subseq => !subseq.length);
}

export default $iterableCurry($includesAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
