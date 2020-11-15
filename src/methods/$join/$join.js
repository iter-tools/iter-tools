import { $wrapWithResultIterable, $ensureIterable } from '../../internal/$iterable';
import { $joinWithSeq } from '../$join-with-seq/$join-with-seq';

const emptySeq = [];

export function $join(source) {
  return $joinWithSeq($ensureIterable(source), emptySeq);
}

export default $wrapWithResultIterable($join);
