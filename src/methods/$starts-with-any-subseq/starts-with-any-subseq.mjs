import { iterableCurry } from '../../internal/iterable';
import { iterableStartsWithAnySubseq } from './internal/iterable-starts-with-any-subseq';
import { stringStartsWithAny } from '../$starts-with-any/internal/string-starts-with-any';

export function startsWithAnySubseq(iterable, values, compare = Object.is) {
  return typeof iterable === 'string'
    ? stringStartsWithAny(iterable, values, compare)
    : iterableStartsWithAnySubseq(iterable, values, compare);
}

export default iterableCurry(startsWithAnySubseq, {
  reduces: true,
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
