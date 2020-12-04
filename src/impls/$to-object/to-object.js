/**
 * @generated-from ./$to-object.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { ensureIterable } from '../../internal/iterable.js';

export function __toObject(iterable, proto = Object.prototype) {
  const obj = Object.create(proto);
  for (const [key, value] of iterable) {
    obj[key] = value;
  }
  return obj;
}

export function toObject(iterable, proto) {
  return __toObject(ensureIterable(iterable), proto);
}
