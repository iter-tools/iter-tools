import { $iterableCurry } from '../../internal/$iterable';
import { $joinWith_ } from '../$join-with_/$join-with_';

const config = { subseq: true };
const emptySubseq = [];

export function $join(iterable) {
  return $joinWith_(iterable, config, emptySubseq);
}

export default $iterableCurry($join);
