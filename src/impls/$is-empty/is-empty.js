/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$is-empty.js#1643837503077
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { __firstOr } from '../$first-or/first-or.js';

const none = Symbol('none');

export function __isEmpty(iterable) {
  return __firstOr(iterable, none) === none;
}

export const isEmpty = /*#__PURE__*/ iterableCurry(__isEmpty, {
  reduces: true,
});
