import { notUndefined } from '../not-undefined/not-undefined.js';

export function isWrappable(value) {
  return value == null || notUndefined(value[Symbol.iterator]);
}
