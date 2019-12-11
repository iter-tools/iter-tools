import { iterableCurry } from '../../internal/iterable';
import { iterableSplitWith } from '../$split-with/internal/iterable-split-with';
import { stringSplitOnAny } from '../$split-on-any/internal/string-split-on-any';

export function splitOn(source, separator) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, [separator])
    : iterableSplitWith(source, value => value === separator);
}

export default iterableCurry(splitOn);
