/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$any-seq.js#1643837503143
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncEnsureIterable } from './async-iterable.js';
import { __asyncToArray } from '../impls/$to-array/async-to-array.js';
import { __asyncMap } from '../impls/$map/async-map.js';

export async function asyncSeqsToArray(values) {
  return await __asyncToArray(
    __asyncMap(values, (value) => __asyncToArray(asyncEnsureIterable(value))),
    (arr) => arr.length > 0,
  );
}
