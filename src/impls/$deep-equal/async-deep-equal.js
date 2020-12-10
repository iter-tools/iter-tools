/**
 * @generated-from ./$deep-equal.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIsIterable, asyncIsWrappable } from '../../internal/async-iterable.js';
import { __map } from '../$map/map.js';
import { __every } from '../$every/every.js';
import { __asyncZipAll } from '../$zip-all/async-zip-all.js';
import { __sliceFromStart } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

const asyncEmpty = async function* () {};

const asyncIterableOrEmpty = (value) => (value == null ? asyncEmpty() : value);

export async function _asyncDeepEqual(values, same, isIterable, depth = 0) {
  if (__every(values, (value) => typeof value !== 'string' && isIterable(value))) {
    for await (const stepValues of __asyncZipAll(
      __map(values, asyncIterableOrEmpty),
      zipAllConfig,
    )) {
      if (!(await __asyncDeepEqual(stepValues, same, isIterable, depth + 1))) return false;
    }
  } else {
    const firstValue = values[0];
    for (const value of __sliceFromStart(values, 1)) {
      if (!same(value, firstValue, depth)) return false;
    }
  }
  return true;
}

export function __asyncDeepEqual(values, same = Object.is, coerceNil = true) {
  return values.length <= 1
    ? true
    : _asyncDeepEqual(values, same, coerceNil ? asyncIsWrappable : asyncIsIterable);
}

export function asyncDeepEqual(...values) {
  return __asyncDeepEqual(values);
}
