import { asyncIterableCurry } from '../../internal/async-iterable';
import { asyncIterableIncludesAnySubseq } from './internal/async-iterable-includes-any-subseq';

export function asyncIncludesAnySubseq(iterable, valueSubseqs, compare = Object.is) {
  return asyncIterableIncludesAnySubseq(iterable, valueSubseqs, compare);
}

export default asyncIterableCurry(asyncIncludesAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
