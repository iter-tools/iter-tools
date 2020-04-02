import { $iterableCurry } from '../../internal/$iterable';
import { $startsWithAnySubseq } from '../$starts-with-any-subseq/$starts-with-any-subseq';

export function $startsWithSubseq(iterable, valueSubseq, compareEquality = Object.is) {
  return $startsWithAnySubseq(iterable, [valueSubseq], compareEquality);
}

export default $iterableCurry($startsWithSubseq, {
  reduces: true,
});
