import { $iterableCurry } from '../../internal/$iterable';
import { $splitWith } from '../$split-with/$split-with';

export function $splitOn(source, separator, compare = Object.is) {
  return $splitWith(source, value => compare(value, separator));
}

export default $iterableCurry($splitOn, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
