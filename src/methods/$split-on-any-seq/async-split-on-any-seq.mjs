/**
 * @generated-from ./$split-on-any-seq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncSeqsToArray } from '../../internal/async-any-seq';
import { startsWithSeq } from '../$starts-with-seq/starts-with-seq';
import { asyncLeadingWindow } from '../$leading-window/async-leading-window';
import { asyncSpliterate } from '../$spliterate/async-spliterate';

function getMatchingLength(buffer, separatorSeqs) {
  for (const subsequence of separatorSeqs) {
    if (startsWithSeq(buffer, subsequence)) {
      return subsequence.length;
    }
  }

  return 0;
}

async function* asyncAnySeqspliterator(split, { separatorSeqs }, source) {
  const maxMatchLength = separatorSeqs.reduce((max, { length }) => Math.max(max, length), 1);

  let skip = 0;

  for await (const buffer of asyncLeadingWindow(source, maxMatchLength, { useFiller: false })) {
    if (skip > 0) {
      skip--;
      continue;
    }
    const matchingLength = getMatchingLength(buffer, separatorSeqs);

    if (matchingLength > 0) {
      yield split;
      skip = matchingLength - 1;
    } else {
      yield buffer.get(0);
    }
  }
}

export async function* asyncSplitOnAnySeq(source, separatorSeqs) {
  const separatorSeqsArr = (await asyncSeqsToArray(separatorSeqs)).filter((s) => s.length > 0);

  yield* asyncSpliterate(source, asyncAnySeqspliterator, {
    separatorSeqs: separatorSeqsArr.sort((a, b) => b.length - a.length),
  });
}

export default asyncIterableCurry(asyncSplitOnAnySeq);
