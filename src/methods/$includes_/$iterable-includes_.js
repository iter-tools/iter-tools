import { $async, $await } from '../../../generate/async.macro';

import { $leadingWindow } from '../$leading-window/$leading-window';
import $toAnySubseq from '../../internal/$to-any-subseq';
import { iterableStartsWith_ } from '../$starts-with_/iterable-starts-with_';

const startsWithConfig = { any: true, subseq: true };

$async;
export function $iterableIncludes_(iterable, config, value) {
  const subseqs = $await($toAnySubseq(config, value));

  const maxMatchLength = subseqs.reduce((max, { length }) => Math.max(max, length), 1);
  let hasItems = false;

  $await;
  for (const buffer of $leadingWindow(iterable, maxMatchLength)) {
    if (iterableStartsWith_(buffer, startsWithConfig, subseqs)) {
      return true;
    }
    hasItems = true;
  }
  return !hasItems && !!subseqs.find(subseq => !subseq.length);
}
