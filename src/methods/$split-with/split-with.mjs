import { iterableCurry } from '../../internal/iterable';
import { iterableSplitWith } from './internal/iterable-split-with';
import { stringSplitWith } from './internal/string-split-with';

export function splitWith(source, predicate) {
  return typeof source === 'string'
    ? stringSplitWith(source, predicate)
    : iterableSplitWith(source, predicate);
}

export default iterableCurry(splitWith);
