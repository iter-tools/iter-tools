/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$starts-with-seq.js#1643837503103
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry, asyncEnsureIterable } from '../../internal/async-iterable.js';

import { __asyncStartsWithAnySeq } from '../$starts-with-any-seq/async-starts-with-any-seq.js';

export function __asyncStartsWithSeq(iterable, seq, same = Object.is) {
  return __asyncStartsWithAnySeq(iterable, [seq], same);
}

export const asyncStartsWithSeq = /*#__PURE__*/ asyncIterableCurry(__asyncStartsWithSeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = asyncEnsureIterable(args[1]);
  },
});
