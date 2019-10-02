import { $iterableCurry } from '../../internal/$iterable';
import { $joinWith_ } from '../$join-with_/$join-with_';

const config = { subseq: true };

export function $joinWithSubseq(source, with_) {
  return $joinWith_(source, config, with_);
}

export default $iterableCurry($joinWithSubseq);
