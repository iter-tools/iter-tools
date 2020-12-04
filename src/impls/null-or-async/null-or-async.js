import { asyncEnsureIterable } from '../../internal/async-iterable.js';
import { asyncPrepend } from '../$prepend/async-prepend.js';

export async function nullOrAsync(source) {
  const iter = asyncEnsureIterable(source)[Symbol.asyncIterator]();
  const { done, value: first } = await iter.next();

  return done ? null : asyncPrepend(first, iter);
}
