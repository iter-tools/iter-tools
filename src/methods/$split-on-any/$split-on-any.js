import { $iterableCurry } from '../../internal/$iterable';
import toArray from '../$to-array/to-array';
import { $splitWith } from '../$split-with/$split-with';

export function $splitOnAny(source, separators) {
  const _separators = toArray(separators);

  return $splitWith(source, value => _separators.includes(value));
}

export default $iterableCurry($splitOnAny, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
