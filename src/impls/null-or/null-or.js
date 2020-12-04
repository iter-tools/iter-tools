import { ensureIterable } from '../../internal/iterable.js';
import { prepend } from '../$prepend/prepend.js';

export function nullOr(source) {
  const iter = ensureIterable(source)[Symbol.iterator]();
  const { done, value: first } = iter.next();

  return done ? null : prepend(first, iter);
}
