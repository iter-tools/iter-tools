import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableStartsWithAnySubseq } from './internal/async-iterable-starts-with-any-subseq';

export function asyncStartsWithAnySubseq(iterable, values, compare = Object.is) {
  return asyncIterableStartsWithAnySubseq(iterable, values, compare);
}

export default asyncIterableCurry(asyncStartsWithAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
