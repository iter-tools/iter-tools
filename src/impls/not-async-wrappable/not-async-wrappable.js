import { isUndefined } from '../is-undefined/is-undefined.js';

export function notAsyncWrappable(value) {
  return (
    value != null && isUndefined(value[Symbol.asyncIterator]) && isUndefined(value[Symbol.iterator])
  );
}
