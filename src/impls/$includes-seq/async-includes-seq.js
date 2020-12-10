/**
 * @generated-from ./$includes-seq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry, asyncEnsureIterable } from '../../internal/async-iterable.js';
import { __asyncIncludesAnySeq } from '../$includes-any-seq/async-includes-any-seq.js';

export function __asyncIncludesSeq(iterable, seq, same = Object.is) {
  return __asyncIncludesAnySeq(iterable, [seq], same);
}

export const asyncIncludesSeq = /*#__PURE__*/ asyncIterableCurry(__asyncIncludesSeq, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {
    args[1] = asyncEnsureIterable(args[1]);
  },
});
