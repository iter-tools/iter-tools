/**
 * @generated-from ./$starts-with-any-seq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry, asyncEnsureIterable } from '../../internal/async-iterable.js';
import { __asyncZipAll } from '../$zip-all/async-zip-all.js';
import { __asyncPeekerate } from '../$peekerate/async-peekerate.js';

const none = Symbol('none');

export async function _asyncStartsWithAnySeq(peekr, subseqPeekr, same) {
  if (subseqPeekr.done || subseqPeekr.value.includes(none)) return true;

  const matches = subseqPeekr.value.map(() => true);

  while (!peekr.done && !subseqPeekr.done) {
    const { value } = peekr; // the value to match
    const { value: seqValue } = subseqPeekr;

    for (let i = 0; i < seqValue.length; i++) {
      if (!matches[i]) continue;
      if (seqValue[i] === none) {
        return true;
      } else {
        matches[i] = same(seqValue[i], value);
      }
    }
    await Promise.all([subseqPeekr.advance(), peekr.advance()]);
  }

  return subseqPeekr.done && matches.includes(true);
}

export async function __asyncStartsWithAnySeq(iterable, seqs, same = Object.is) {
  if (!seqs.length) return false;
  const peekr = await __asyncPeekerate(iterable);
  const subseqPeekr = await __asyncPeekerate(__asyncZipAll(seqs, { filler: none }));

  const seqFound = await _asyncStartsWithAnySeq(peekr, subseqPeekr, same);

  await subseqPeekr.return();
  await peekr.return();

  return seqFound;
}

export const asyncStartsWithAnySeq = /*#__PURE__*/ asyncIterableCurry(__asyncStartsWithAnySeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = args[1].map((arg) => asyncEnsureIterable(arg));
  },
});
