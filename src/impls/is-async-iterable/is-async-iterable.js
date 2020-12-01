import { notUndefined } from '../not-undefined/not-undefined.js';

export function isAsyncIterable(value) {
  return value != null && notUndefined(value[Symbol.asyncIterator]);
}

export default isAsyncIterable;
