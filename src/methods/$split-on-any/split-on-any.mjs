import { iterableCurry } from '../../internal/iterable';
import { stringSplitOnAny } from './internal/string-split-on-any';
import { iterableSplitOnAny } from './internal/iterable-split-on-any';

export function splitOnAny(source, separators, equals = Object.is) {
  return typeof source === 'string'
    ? stringSplitOnAny(source, separators, equals)
    : iterableSplitOnAny(source, separators, equals);
}

export default iterableCurry(splitOnAny, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
