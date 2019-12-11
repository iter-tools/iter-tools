import { iterableCurry } from '../../internal/iterable';
import { stringSplitOnAny } from './internal/string-split-on-any';
import { iterableSplitOnAny } from './internal/iterable-split-on-any';

export function splitOnAny(source, separators) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, separators)
    : iterableSplitOnAny(source, separators);
}

export default iterableCurry(splitOnAny);
