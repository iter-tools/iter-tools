import { $async, $await } from '../../../generate/async.macro';

import { $cursor } from '../$cursor/$cursor';
import $toAnySubseq from '../../internal/$to-any-subseq';
import startsWith from '../$starts-with_/iterable-starts-with';

const startsWithConfig = { any: true, subseq: true };

$async;
function $iterableIncludes(iterable, config, value) {
  const subseqs = $await($toAnySubseq(config, value));

  const maxMatchLength = subseqs.reduce((max, { length }) => Math.max(max, length), 1);
  let hasItems = false;

  $await;
  for (const buffer of $cursor(iterable, { size: maxMatchLength, trailing: true })) {
    if (startsWith(buffer, startsWithConfig, subseqs)) {
      return true;
    }
    hasItems = true;
  }
  return !hasItems && !!subseqs.find(subseq => !subseq.length);
}

export default $iterableIncludes;
