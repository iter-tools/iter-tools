/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$first-or.js#1643837503063
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry, callReturn } from '../../internal/iterable.js';

export function __firstOr(iterable, whenEmpty) {
  const iter = iterable[Symbol.iterator]();
  const { value, done } = iter.next();

  if (done) return whenEmpty;

  callReturn(iter);

  return value;
}

export const firstOr = /*#__PURE__*/ iterableCurry(__firstOr, {
  reduces: true,
});
