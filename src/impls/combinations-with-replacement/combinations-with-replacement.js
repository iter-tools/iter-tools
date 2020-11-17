import { iterableCurry } from '../../internal/iterable.js';
import { factorial } from '../../internal/factorial.js';
import { map } from '../$map/map.js';
import { range } from '../range/range.js';
import { product } from '../product/product.js';
import { isSorted } from '../$is-sorted/is-sorted.js';

function combinationsWithReplacementSize(len, n) {
  if (len === 0 || n === 0 || n > len) return 0;
  return factorial(len + n - 1, len - 1) / factorial(n);
}

export function combinationsWithReplacement(iterable, n) {
  const arr = [...iterable];
  const len = arr.length;
  let _size = null;

  n = n === undefined ? len : n;

  return {
    *[Symbol.iterator]() {
      const toIndex = (i) => arr[i];

      for (const indices of product(...map(range(0, n), () => range(0, len)))) {
        if (isSorted(indices)) {
          yield [...map(indices, toIndex)];
        }
      }
    },

    get size() {
      return _size === null ? (_size = combinationsWithReplacementSize(len, n)) : _size;
    },
  };
}

export default /*#__PURE__*/ iterableCurry(combinationsWithReplacement, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
