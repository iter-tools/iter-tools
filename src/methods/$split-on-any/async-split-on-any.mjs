import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableSplitOnAny } from './internal/async-iterable-split-on-any';

export function asyncSplitOnAny(source, predicate, equals = Object.is) {
  return asyncIterableSplitOnAny(source, predicate, equals);
}

export default asyncIterableCurry(asyncSplitOnAny, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
