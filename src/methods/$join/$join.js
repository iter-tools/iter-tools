import { $iterableCurry } from '../../internal/$iterable';
import { $joinWithSubseq } from '../$join-with-subseq/$join-with-subseq';

const emptySubseq = [];

export function $join(source) {
  return $joinWithSubseq(source, emptySubseq);
}

export default $iterableCurry($join);
