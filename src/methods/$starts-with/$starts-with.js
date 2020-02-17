import { $iterableCurry } from '../../internal/$iterable';
import { $startsWithAny } from '../$starts-with-any/$starts-with-any';

export function $startsWith(iterable, value, compareEquality = Object.is) {
  return $startsWithAny(iterable, [value], compareEquality);
}

export default $iterableCurry($startsWith, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
