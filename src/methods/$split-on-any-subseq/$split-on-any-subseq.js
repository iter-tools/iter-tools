import { $async, $await } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $subseqsToArray } from '../../internal/$any-subseq';
import { startsWithSubseq } from '../$starts-with-subseq/starts-with-subseq';
import { $leadingWindow } from '../$leading-window/$leading-window';
import { $spliterate } from '../$spliterate/$spliterate';

function getMatchingLength(buffer, separatorSubseqs) {
  for (const subsequence of separatorSubseqs) {
    if (startsWithSubseq(buffer, subsequence)) {
      return subsequence.length;
    }
  }

  return 0;
}

$async;
function* $anySubseqSpliterator(split, { separatorSubseqs }, source) {
  const maxMatchLength = separatorSubseqs.reduce((max, { length }) => Math.max(max, length), 1);

  let skip = 0;

  $await;
  for (const buffer of $leadingWindow(source, maxMatchLength, { useFiller: false })) {
    if (skip > 0) {
      skip--;
      continue;
    }
    const matchingLength = getMatchingLength(buffer, separatorSubseqs);

    if (matchingLength > 0) {
      yield split;
      skip = matchingLength - 1;
    } else {
      yield buffer.get(0);
    }
  }
}

$async;
export function* $splitOnAnySubseq(source, separatorSubseqs) {
  const separatorSubseqsArr = $await($subseqsToArray(separatorSubseqs)).filter(s => s.length > 0);

  yield* $spliterate(source, $anySubseqSpliterator, {
    separatorSubseqs: separatorSubseqsArr.sort((a, b) => b.length - a.length),
  });
}

export default $iterableCurry($splitOnAnySubseq);
