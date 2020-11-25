/**
 * @generated-from ./$includes-any-seq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable';
import { seqsToArray } from '../../internal/any-seq';
import { leadingWindow } from '../$leading-window/leading-window';
import { startsWithAnySeq } from '../$starts-with-any-seq/starts-with-any-seq';

export function includesAnySeq(iterable, seqs) {
  const seqsArr = seqsToArray(seqs);

  if (!seqsArr.length) return false;
  if (seqsArr.find((seq) => !seq.length)) return true;

  const maxMatchLength = seqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  for (const buffer of leadingWindow(iterable, maxMatchLength)) {
    if (startsWithAnySeq(buffer, seqsArr)) {
      return true;
    }
  }
  return false;
}

export default iterableCurry(includesAnySeq, {
  reduces: true,
});
