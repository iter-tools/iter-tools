import { $iterableCurry } from '../../internal/$iterable';
import { $startsWithAny } from '../$starts-with-any/$starts-with-any';

export function $startsWith(iterable, value, compare = Object.is) {
  return $startsWithAny(iterable, [value], compare);
}

export default $iterableCurry($startsWith, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
