import { $iterableCurry } from '../../internal/$iterable';
import { $joinWithSubseq } from '../$join-with-subseq/$join-with-subseq';

export function $joinWith(source, separator) {
  return $joinWithSubseq(source, [separator]);
}

export default $iterableCurry($joinWith);
