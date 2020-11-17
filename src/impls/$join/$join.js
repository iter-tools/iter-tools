import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable.js';
import { $joinWithSeq } from '../$join-with-seq/$join-with-seq.js';

const emptySeq = [];

export function $join(source) {
  return $joinWithSeq($ensureIterable(source), emptySeq);
}

export default $wrapWithResultIterable($join);
