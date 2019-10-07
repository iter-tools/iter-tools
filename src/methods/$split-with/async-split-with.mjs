import { asyncIterableCurry } from '../../internal/async-iterable';
import asyncIterableSplitWith from './async-iterable-split-with';

export function asyncSplitWith(source, predicate) {
  return asyncIterableSplitWith(source, predicate);
}

export default asyncIterableCurry(asyncSplitWith);
