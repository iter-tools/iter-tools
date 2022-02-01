/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$split-when.js#1643837503097
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { __spliterate } from '../$spliterate/spliterate.js';

function* predicateSpliterator(split, { predicate }, source) {
  let i = 0;
  for (const value of source) {
    yield predicate(value, i++) ? split : value;
  }
}

export function __splitWhen(source, predicate) {
  return __spliterate(source, predicateSpliterator, { predicate });
}

export const splitWhen = /*#__PURE__*/ iterableCurry(__splitWhen);
