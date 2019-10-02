import { iterableCurry } from '../../internal/iterable';
import iterableSplitWith from './iterable-split-with';
import stringSplitWith from './string-split-with';

function splitWith(source, predicate) {
  return typeof source === 'string'
    ? stringSplitWith(source, predicate)
    : iterableSplitWith(source, predicate);
}

export default iterableCurry(splitWith);
