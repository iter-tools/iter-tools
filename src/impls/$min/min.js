/**
 * @generated-from ./$min.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { __peekerate } from '../$peekerate/peekerate.js';

import { iterableCurry } from '../../internal/iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';

export function __min(iterable, compare = defaultCompareOrder) {
  const peekr = __peekerate(iterable);

  if (!peekr.done) {
    let minValue = peekr.value;

    peekr.advance();
    while (!peekr.done) {
      const value = peekr.value;
      if (compare(minValue, value) > 0) {
        minValue = value;
      }
      peekr.advance();
    }
    return minValue;
  }
}

export const min = iterableCurry(__min, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
