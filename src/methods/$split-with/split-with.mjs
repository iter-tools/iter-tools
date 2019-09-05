import { iterableCurry } from '../../internal/iterable';
import iterableSplitWith from './iterable-split-with';
import stringSplitWith from './string-split-with';

function splitWith(iterable, predicate) {
  return typeof iterable === 'string'
    ? stringSplitWith(iterable, predicate)
    : iterableSplitWith(iterable, predicate);
}

export default iterableCurry(splitWith);
