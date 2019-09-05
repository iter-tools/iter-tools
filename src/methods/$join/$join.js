import { $iterableCurry } from '../../internal/$iterable';
import $internalJoinWith from '../$join-with_/$join-with';

const config = { subseq: true };
const emptySubseq = [];

export function $join(iterable) {
  return $internalJoinWith(iterable, config, emptySubseq);
}

export default $iterableCurry($join);
