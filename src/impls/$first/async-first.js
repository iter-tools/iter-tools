/**
 * @generated-from ./$first.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncFirstOr } from '../$first-or/async-first-or.js';

export function __asyncFirst(iterable) {
  return __asyncFirstOr(iterable, undefined);
}

export const asyncFirst = /*#__PURE__*/ asyncIterableCurry(__asyncFirst, {
  reduces: true,
});