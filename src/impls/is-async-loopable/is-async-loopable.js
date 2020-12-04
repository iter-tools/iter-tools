import { notUndefined } from '../not-undefined/not-undefined.js';

export function isAsyncLoopable(value) {
  return (
    value != null &&
    (notUndefined(value[Symbol.asyncIterator]) || notUndefined(value[Symbol.iterator]))
  );
}
