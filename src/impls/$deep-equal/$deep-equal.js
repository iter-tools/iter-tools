import { $async, $await } from '../../../generate/async.macro.cjs';

import { $isIterable, $isWrappable } from '../../internal/$iterable.js';
import { __map } from '../$map/map.js';
import { __every } from '../$every/every.js';
import { $__zipAll } from '../$zip-all/$zip-all.js';
import { __sliceFromStart } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

const $empty = $async(function* () {});

const $iterableOrEmpty = (value) => (value == null ? $empty() : value);

$async;
export function $_deepEqual(values, same, isIterable, depth = 0) {
  if (__every(values, (value) => typeof value !== 'string' && isIterable(value))) {
    $await;
    for (const stepValues of $__zipAll(__map(values, $iterableOrEmpty), zipAllConfig)) {
      if (!$await($__deepEqual(stepValues, same, isIterable, depth + 1))) return false;
    }
  } else {
    const firstValue = values[0];
    for (const value of __sliceFromStart(values, 1)) {
      if (!same(value, firstValue, depth)) return false;
    }
  }
  return true;
}

export function $__deepEqual(values, same = Object.is, coerceNil = true) {
  return values.length <= 1
    ? true
    : $_deepEqual(values, same, coerceNil ? $isWrappable : $isIterable);
}

export function $deepEqual(...values) {
  return $__deepEqual(values);
}
