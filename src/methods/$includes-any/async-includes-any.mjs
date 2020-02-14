import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableIncludesAny } from './internal/async-iterable-includes-any';

export function asyncIncludesAny(iterable, values, compare = Object.is) {
  return asyncIterableIncludesAny(iterable, values, compare);
}

export default asyncIterableCurry(asyncIncludesAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
