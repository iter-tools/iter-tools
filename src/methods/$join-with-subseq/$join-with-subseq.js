import { $iterableCurry } from '../../internal/$iterable';
import $internalJoinWith from '../$join-with_/$join-with';

const config = { subseq: true };

export function $joinWithSubseq(iterable, with_) {
  return $internalJoinWith(iterable, config, with_);
}

export default $iterableCurry($joinWithSubseq);
