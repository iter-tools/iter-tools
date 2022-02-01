/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$includes-any-seq.js#1643837503069
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { asyncSeqsToArray } from '../../internal/async-any-seq.js';
import { __asyncWindowAhead } from '../$window-ahead/async-window-ahead.js';
import { __startsWithAnySeq } from '../$starts-with-any-seq/starts-with-any-seq.js';

export async function __asyncIncludesAnySeq(iterable, seqs, same = Object.is) {
  const seqsArr = await asyncSeqsToArray(seqs);

  if (!seqsArr.length) return false;
  if (seqsArr.find((seq) => !seq.length)) return true;

  const maxMatchLength = seqsArr.reduce((max, { length }) => Math.max(max, length), 1);

  for await (const buffer of __asyncWindowAhead(iterable, maxMatchLength)) {
    if (__startsWithAnySeq(buffer, seqsArr, same)) {
      return true;
    }
  }
  return false;
}

export const asyncIncludesAnySeq = /*#__PURE__*/ asyncIterableCurry(__asyncIncludesAnySeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
});
