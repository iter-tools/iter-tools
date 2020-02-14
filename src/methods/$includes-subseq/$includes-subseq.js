import { $iterableCurry } from '../../internal/$iterable';
import { $includesAnySubseq } from '../$includes-any-subseq/$includes-any-subseq';

export function $includesSubseq(iterable, subseq, compare = Object.is) {
  return $includesAnySubseq(iterable, [subseq], compare);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
