/**
 * @generated-from ./$split-on-any.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable.js';
import { __splitWhen } from '../$split-when/split-when.js';
import { __includes } from '../$includes/includes.js';

export function __splitOnAny(source, separators, same = Object.is) {
  return __splitWhen(source, (value) => __includes(separators, value, (a, b) => same(b, a)));
}

export const splitOnAny = /*#__PURE__*/ iterableCurry(__splitOnAny, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {
    if (true && typeof args[0] === 'string') {
      console.warn(`For string inputs use splitOnAnySeq instead of splitOnAny`);
    }
  },
});
