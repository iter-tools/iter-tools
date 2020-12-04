/**
 * @generated-from ./$any-seq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { ensureIterable } from './iterable.js';
import { __toArray } from '../impls/$to-array/to-array.js';
import { __map } from '../impls/$map/map.js';

export function seqsToArray(values) {
  return __toArray(
    __map(values, (value) => __toArray(ensureIterable(value))),
    (arr) => arr.length > 0,
  );
}
