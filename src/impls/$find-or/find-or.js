/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$find-or.js#1643837503060
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';

export function __findOr(iterable, notFoundValue, func) {
  let c = 0;
  for (const value of iterable) {
    if (func(value, c++)) {
      return value;
    }
  }
  return notFoundValue;
}

export const findOr = /*#__PURE__*/ iterableCurry(__findOr, {
  growRight: true,
  reduces: true,
});
