import { $async, $await } from '../../../../generate/async.macro';

import { $ensureSubseqs } from '../../../internal/$ensure-subseqs';
import { $leadingWindow } from '../../$leading-window/$leading-window';
import { iterableStartsWithAnySubseq } from '../../$starts-with-any-subseq/internal/iterable-starts-with-any-subseq';

$async;
export function $iterableIncludesAnySubseq(iterable, valueSubseqs, compareEquality) {
  const valueArrays = $await($ensureSubseqs(valueSubseqs));
  const maxMatchLength = valueArrays.reduce((max, { length }) => Math.max(max, length), 1);
  let hasItems = false;

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (iterableStartsWithAnySubseq(buffer, valueArrays, compareEquality)) {
      return true;
    }
    hasItems = true;
  }
  return !hasItems && !!valueArrays.find(subseq => !subseq.length);
}
