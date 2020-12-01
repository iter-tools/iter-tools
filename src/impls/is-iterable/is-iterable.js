import { notUndefined } from '../not-undefined/not-undefined.js';

export function isIterable(value) {
  return value != null && notUndefined(value[Symbol.iterator]);
}

export default isIterable;
