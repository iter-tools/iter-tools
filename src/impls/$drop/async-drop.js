/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$drop.js#1643837503055
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';

export async function* __asyncDrop(iterable, n) {
  let i = 0;
  for await (const value of iterable) {
    if (i++ >= n) yield value;
  }
}

export const asyncDrop = /*#__PURE__*/ asyncIterableCurry(__asyncDrop);
