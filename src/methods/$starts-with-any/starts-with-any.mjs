import { iterableCurry } from '../../internal/iterable';
import { iterableStartsWithAny } from './internal/iterable-starts-with-any';
import { stringStartsWithAny } from './internal/string-starts-with-any';

export function startsWithAny(iterable, values, compare = Object.is) {
  return typeof iterable === 'string'
    ? stringStartsWithAny(iterable, values, compare)
    : iterableStartsWithAny(iterable, values, compare);
}

export default iterableCurry(startsWithAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
