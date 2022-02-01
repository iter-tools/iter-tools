/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$zip-all.js#1643837503118
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { asyncIterableCurry } from '../../internal/async-iterable.js';
import { asyncParallelEach } from '../../internal/async-parallel-each.js';
import { __asyncPeekerate } from '../$peekerate/async-peekerate.js';
import { __asyncMap } from '../$map/async-map.js';
import { __every } from '../$every/every.js';
import { __asyncToArray } from '../$to-array/async-to-array.js';

const isDone = (peekr) => peekr.done;

export async function* __asyncZipAll(sources, { filler } = {}) {
  const peekrs = await __asyncToArray(__asyncMap(sources, __asyncPeekerate));
  let done = __every(peekrs, isDone);

  try {
    while (!done) {
      yield peekrs.map(({ value, done }) => (done ? filler : value));

      await asyncParallelEach(peekrs, (peekr) => peekr.advance());

      done = __every(peekrs, isDone);
    }
  } finally {
    await asyncParallelEach(peekrs, (peekr) => peekr.return());
  }
}

export const asyncZipAll = /*#__PURE__*/ asyncIterableCurry(__asyncZipAll, {
  variadic: true,
  minArgs: 0,
  maxArgs: 1,
});
