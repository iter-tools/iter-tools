import { $iterableCurry } from '../../internal/$iterable';
import { $includesAny } from '../$includes-any/$includes-any';

export function $includes(iterable, value, compareEquality = Object.is) {
  return $includesAny(iterable, [value], compareEquality);
}

export default $iterableCurry($includes, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
