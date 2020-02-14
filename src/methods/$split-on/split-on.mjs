import { iterableCurry } from '../../internal/iterable';
import { iterableSplitWith } from '../$split-with/internal/iterable-split-with';
import { stringSplitOnAny } from '../$split-on-any/internal/string-split-on-any';

export function splitOn(source, separator, compare = Object.is) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, [separator], compare)
    : iterableSplitWith(source, value => compare(value, separator));
}

export default iterableCurry(splitOn, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
