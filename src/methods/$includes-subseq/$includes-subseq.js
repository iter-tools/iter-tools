import { $iterableCurry } from '../../internal/$iterable';
import { $includesAnySubseq } from '../$includes-any-subseq/$includes-any-subseq';

export function $includesSubseq(iterable, subseq, compareEquality = Object.is) {
  return $includesAnySubseq(iterable, [subseq], compareEquality);
}

export default $iterableCurry($includesSubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
