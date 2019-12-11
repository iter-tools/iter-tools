import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitOnAny } from './internal/async-iterable-split-on-any';

export function asyncSplitOnAny(source, predicate) {
  return asyncIterableSplitOnAny(source, predicate);
}

export default asyncIterableCurry(asyncSplitOnAny);
