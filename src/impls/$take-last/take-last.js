/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$take-last.js#1643837503108
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { __takeLastOr } from '../$take-last-or/take-last-or.js';

export function __takeLast(iterable) {
  return __takeLastOr(iterable, undefined);
}

export const takeLast = /*#__PURE__*/ iterableCurry(__takeLast, {
  reduces: true,
});
