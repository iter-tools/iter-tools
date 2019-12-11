import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitOnAnySubseq } from './internal/async-iterable-split-on-any-subseq';

export function asyncSplitOnAnySubseq(source, separatorSubseqs) {
  return asyncIterableSplitOnAnySubseq(source, separatorSubseqs);
}

export default asyncIterableCurry(asyncSplitOnAnySubseq);
