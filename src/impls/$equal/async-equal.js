/**
 * @generated-from ./$equal.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncZipAll } from '../$zip-all/async-zip-all.js';
import { __sliceFromStart } from '../$slice/slice.js';

const none = Symbol('none');
const zipAllConfig = { filler: none };

export async function __asyncEqual(iterables) {
  if (iterables.length <= 1) {
    return true;
  }

  for await (const stepValues of __asyncZipAll(iterables, zipAllConfig)) {
    const firstValue = stepValues[0];
    for (const value of __sliceFromStart(stepValues, 1, Infinity)) {
      if (value !== firstValue) {
        return false;
      }
    }
  }

  return true;
}

export const asyncEqual = /*#__PURE__*/ asyncIterableCurry(__asyncEqual, {
  reduces: true,
  variadic: true,
});