/**
 * @generated-from ./$join.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { wrapWithResultIterable, ensureIterable } from '../../internal/iterable.js';
import { __joinWithSeq } from '../$join-with-seq/join-with-seq.js';

const emptySeq = [];

export function __join(source) {
  return __joinWithSeq(ensureIterable(source), emptySeq);
}

export const join = /*#__PURE__*/ wrapWithResultIterable(__join);
