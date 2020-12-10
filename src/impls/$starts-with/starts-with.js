/**
 * @generated-from ./$starts-with.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { iterableCurry } from '../../internal/iterable.js';
import { __startsWithAny } from '../$starts-with-any/starts-with-any.js';

export function __startsWith(iterable, values) {
  return __startsWithAny(iterable, [values]);
}

export const startsWith = /*#__PURE__*/ iterableCurry(__startsWith, {
  reduces: true,
  validateArgs(args) {
    if (true && typeof args[0] === 'string') {
      console.warn('For string inputs use startsWithSeq instead of startsWith');
    }
  },
});