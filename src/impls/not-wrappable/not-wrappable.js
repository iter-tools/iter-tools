import { isUndefined } from '../is-undefined/is-undefined.js';

export function notWrappable(value) {
  return value != null && isUndefined(value[Symbol.iterator]);
}
