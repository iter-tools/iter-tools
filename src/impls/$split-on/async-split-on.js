/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$split-on.js#1643837503096
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncSplitWhen } from '../$split-when/async-split-when.js';

export function __asyncSplitOn(source, separator, same = Object.is) {
  return __asyncSplitWhen(source, (value) => same(separator, value));
}

export const asyncSplitOn = /*#__PURE__*/ asyncIterableCurry(__asyncSplitOn, {
  minArgs: 1,
  maxArgs: 2,
  validateArgs(args) {},
});
