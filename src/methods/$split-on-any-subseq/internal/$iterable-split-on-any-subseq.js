import { $async, $await } from '../../../../generate/async.macro';

import { iterableStartsWith_ } from '../../$starts-with_/iterable-starts-with_';
import $map from '../../$map/$map';
import $toArray from '../../$to-array/$to-array';
import { $leadingWindow } from '../../$leading-window/$leading-window';
import { $spliterate } from '../../$spliterate/$spliterate';

const startsWithConfig = { any: false, subseq: true };

function getMatchingLength(buffer, separatorSubseqs) {
  for (const subsequence of separatorSubseqs) {
    if (iterableStartsWith_(buffer, startsWithConfig, subsequence)) {
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
export function* $iterableSplitOnAnySubseq(source, separatorSubseqs) {
  yield* $spliterate(source, $anySubseqSpliterator, {
    separatorSubseqs: $await($toArray($map($toArray, separatorSubseqs)))
      .filter(subseq => subseq.length)
      .sort((a, b) => b.length - a.length),
  });
}
