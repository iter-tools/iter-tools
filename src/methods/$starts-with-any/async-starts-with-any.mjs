import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableStartsWithAny } from './internal/async-iterable-starts-with-any';

export function asyncStartsWithAny(iterable, values, equals = Object.is) {
  return asyncIterableStartsWithAny(iterable, values, equals);
}

export default asyncIterableCurry(asyncStartsWithAny, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
