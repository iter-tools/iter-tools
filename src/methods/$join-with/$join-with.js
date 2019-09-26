import { $iterableCurry } from '../../internal/$iterable';
import { $joinWith_ } from '../$join-with_/$join-with_';

const config = { subseq: false };

export function $joinWith(iterable, with_) {
  return $joinWith_(iterable, config, with_);
}

export default $iterableCurry($joinWith);
