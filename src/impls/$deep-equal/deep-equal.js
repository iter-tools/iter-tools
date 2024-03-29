/**
 * @generated-from ./$deep-equal.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { isIterable, isWrappable } from '../../internal/iterable.js';
import { __map } from '../$map/map.js';
import { __every } from '../$every/every.js';
import { __zipAll } from '../$zip-all/zip-all.js';
import { __sliceFromStart } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

const empty = function* () {};

const iterableOrEmpty = (value) => (value == null ? empty() : value);

export function _deepEqual(values, same, isIterable, depth = 0) {
  if (__every(values, (value) => typeof value !== 'string' && isIterable(value))) {
    for (const stepValues of __zipAll(__map(values, iterableOrEmpty), zipAllConfig)) {
      if (!_deepEqual(stepValues, same, isIterable, depth + 1)) return false;
    }
  } else {
    const firstValue = values[0];
    for (const value of __sliceFromStart(values, 1)) {
      if (!same(value, firstValue, depth)) return false;
    }
  }
  return true;
}

export function __deepEqual(values, same = Object.is, coerceNil = true) {
  return values.length <= 1 ? true : _deepEqual(values, same, coerceNil ? isWrappable : isIterable);
}

export function deepEqual(...values) {
  return __deepEqual(values);
}
