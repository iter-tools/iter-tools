import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitOnAnySubseq } from './internal/async-iterable-split-on-any-subseq';

export function asyncSplitOnAnySubseq(source, separatorSubseqs, equals = Object.is) {
  return asyncIterableSplitOnAnySubseq(source, separatorSubseqs, equals);
}

export default asyncIterableCurry(asyncSplitOnAnySubseq, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
