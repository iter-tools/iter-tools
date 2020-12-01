import { isUndefined } from '../is-undefined/is-undefined.js';

export function notIterable(value) {
  return value == null || isUndefined(value[Symbol.iterator]);
}

export default notIterable;
