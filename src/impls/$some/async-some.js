/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$some.js#1643837503090
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function __asyncSome(iterable, func) {
  let c = 0;
  for await (const value of iterable) {
    if (await func(value, c++)) {
      return true;
    }
  }
  return false;
}

export const asyncSome = /*#__PURE__*/ asyncIterableCurry(__asyncSome, { reduces: true });
