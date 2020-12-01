import { isUndefined } from '../is-undefined/is-undefined.js';

export function notAsyncIterable(value) {
  return value == null || isUndefined(value[Symbol.asyncIterator]);
}

export default notAsyncIterable;
