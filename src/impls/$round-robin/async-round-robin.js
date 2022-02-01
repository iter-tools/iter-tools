/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$round-robin.js#1643837503087
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { __asyncInterleave } from '../$interleave/async-interleave.js';
import { makeValidateArgs } from './internal/validate-args.js';

async function* asyncByPosition({ start, step }, all, ...peekrs) {
  start = start % peekrs.length;
  for (let i = start; !all.done; i = (i + step) % peekrs.length) {
    const peekr = peekrs[i];
    if (!peekr.done) {
      yield peekr.value;
      await peekr.advance();
    }
  }
}

export function __asyncRoundRobin(sources, step = 1, start = 0) {
  return __asyncInterleave(sources, asyncByPosition, { start, step });
}

export const asyncRoundRobin = /*#__PURE__*/ asyncIterableCurry(__asyncRoundRobin, {
  variadic: true,
  minArgs: 0,
  maxArgs: 2,
  validateArgs: /*#__PURE__*/ makeValidateArgs('asyncRoundRobin'),
});
