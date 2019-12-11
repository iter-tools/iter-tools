import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitWith } from '../$split-with/internal/async-iterable-split-with';

export function asyncSplitOn(source, separator) {
  return asyncIterableSplitWith(source, value => value === separator);
}

export default asyncIterableCurry(asyncSplitOn);
