import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitWith } from '../$split-with/internal/async-iterable-split-with';

export function asyncSplitOn(source, separator, compare = Object.is) {
  return asyncIterableSplitWith(source, value => compare(value, separator));
}

export default asyncIterableCurry(asyncSplitOn, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
