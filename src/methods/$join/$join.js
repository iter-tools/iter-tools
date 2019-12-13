import { $wrapWithMethodIterable, $ensureIterable } from '../../internal/$iterable';
import { $joinWithSubseq } from '../$join-with-subseq/$join-with-subseq';

const emptySubseq = [];

export function $join(source) {
  return $joinWithSubseq($ensureIterable(source), emptySubseq);
}

export default $wrapWithMethodIterable($join);
