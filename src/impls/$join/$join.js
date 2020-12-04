import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';
import { $__joinWithSeq } from '../$join-with-seq/$join-with-seq.js';

const emptySeq = [];

export function $__join(source) {
  return $__joinWithSeq($ensureIterable(source), emptySeq);
}

export const $join = /*#__PURE__*/ $wrapWithResultIterable($__join);
