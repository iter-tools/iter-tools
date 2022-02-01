/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$is-sorted.js#1643837503078
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { iterableCurry } from '../../internal/iterable.js';
import { defaultCompareOrder } from '../../internal/compare.js';
import { __peekerate } from '../$peekerate/peekerate.js';

export function __isSorted(iterable, compare = defaultCompareOrder) {
  const peekr = __peekerate(iterable);

  while (!peekr.done) {
    const { value } = peekr;
    peekr.advance();

    if (!peekr.done && compare(value, peekr.value) > 0) {
      peekr.return();
      return false;
    }
  }
  return true;
}

export const isSorted = /*#__PURE__*/ iterableCurry(__isSorted, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
