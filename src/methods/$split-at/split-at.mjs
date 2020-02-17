import { iterableCurry } from '../../internal/iterable';
import { wrap } from '../$wrap/wrap';
import { SplitAt } from './internal/iterable-split-at';
import { stringSplitAt } from './internal/string-split-at';

export function splitAt(source, idx) {
  return typeof source === 'string'
    ? wrap(stringSplitAt(source, idx))
    : wrap(new SplitAt(source, idx));
}

export default iterableCurry(splitAt);
