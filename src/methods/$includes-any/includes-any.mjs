import { iterableCurry } from '../../internal/iterable';
import { iterableIncludesAny } from './internal/iterable-includes-any';
import { stringIncludesAny } from '../$includes-any/internal/string-includes-any';

export function includesAny(iterable, values, compare = Object.is) {
  return typeof iterable === 'string'
    ? stringIncludesAny(iterable, values, compare)
    : iterableIncludesAny(iterable, values, compare);
}

export default iterableCurry(includesAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
