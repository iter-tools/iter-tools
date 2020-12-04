import { isUndefined } from '../is-undefined/is-undefined.js';

export function notAsyncLoopable(value) {
  return (
    value == null ||
    (isUndefined(value[Symbol.asyncIterator]) && isUndefined(value[Symbol.iterator]))
  );
}
