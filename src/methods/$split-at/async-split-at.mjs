import { asyncIterableCurry } from '../../internal/async-iterable';
import { wrap } from '../$wrap/wrap';
import { AsyncSplitAt } from './internal/async-iterable-split-at';

export function asyncSplitAt(source, idx) {
  return wrap(new AsyncSplitAt(source, idx));
}

export default asyncIterableCurry(asyncSplitAt, {
  forceSync: true,
});
