import { $iterableCurry } from '../../internal/$iterable';
import { $includesAny } from '../$includes-any/$includes-any';

export function $includes(iterable, value, compare = Object.is) {
  return $includesAny(iterable, [value], compare);
}

export default $iterableCurry($includes, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
