import { $iterableCurry } from '../../internal/$iterable';
import { $startsWithAnySubseq } from '../$starts-with-any-subseq/$starts-with-any-subseq';

export function $startsWithSubseq(iterable, valueSubseq, compare) {
  return $startsWithAnySubseq(iterable, [valueSubseq], compare);
}

export default $iterableCurry($startsWithSubseq, {
  reduces: true,
});
