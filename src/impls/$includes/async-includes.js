/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$includes.js#1643837503072
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncFindOr } from '../$find-or/async-find-or.js';

const none = Symbol('none');

export async function __asyncIncludes(iterable, value, same = Object.is) {
  return (await __asyncFindOr(iterable, none, (v) => same(value, v))) !== none;
}

export const asyncIncludes = /*#__PURE__*/ asyncIterableCurry(__asyncIncludes, {
  minArgs: 1,
  maxArgs: 2,
  reduces: true,
  validateArgs(args) {},
});
