import { $iterableCurry } from '../../internal/$iterable';
import { $splitOnAnySubseq } from '../$split-on-any-subseq/$split-on-any-subseq';

export function $splitOnSubseq(source, separatorSubseq, equals = Object.is) {
  return $splitOnAnySubseq(source, [separatorSubseq], equals);
}

export default $iterableCurry($splitOnSubseq, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
