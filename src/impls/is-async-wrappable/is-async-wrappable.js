import { notUndefined } from '../not-undefined/not-undefined.js';

export function isAsyncWrappable(value) {
  return (
    value == null ||
    notUndefined(value[Symbol.asyncIterator]) ||
    notUndefined(value[Symbol.iterator])
  );
}

export default isAsyncWrappable;
