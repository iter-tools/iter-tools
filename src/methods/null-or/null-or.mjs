import { ensureIterable } from '../../internal/iterable';
import prepend from '../$prepend/prepend';

export function nullOr(source) {
  const iter = ensureIterable(source)[Symbol.iterator]();
  const { done, value: first } = iter.next();

  return done ? null : prepend(first, iter);
}

export default nullOr;
