/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$filter.js#1643837503059
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';

export function* __filter(source, predicate) {
  let c = 0;
  for (const value of source) {
    if (predicate(value, c++)) {
      yield value;
    }
  }
}

export const filter = /*#__PURE__*/ iterableCurry(__filter);
