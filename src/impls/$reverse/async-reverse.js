/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$reverse.js#1643837503086
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncToArray } from '../$to-array/async-to-array.js';

export async function* __asyncReverse(source) {
  yield* (await __asyncToArray(source)).reverse();
}

export const asyncReverse = /*#__PURE__*/ asyncIterableCurry(__asyncReverse);
