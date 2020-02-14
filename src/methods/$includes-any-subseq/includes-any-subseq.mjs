import { iterableCurry } from '../../internal/iterable';
import { iterableIncludesAnySubseq } from './internal/iterable-includes-any-subseq';

export function includesAnySubseq(iterable, valueSubseqs, compare = Object.is) {
  return iterableIncludesAnySubseq(iterable, valueSubseqs, compare);
}

export default iterableCurry(includesAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
