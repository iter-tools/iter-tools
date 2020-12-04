import { iterableCurry } from '../../internal/iterable.js';
import { factorial } from '../../internal/factorial.js';
import { __arrayFrom } from '../array-from/array-from.js';
import { __map } from '../$map/map.js';
import { __range } from '../range/range.js';
import { __product } from '../product/product.js';
import { __isSorted } from '../$is-sorted/is-sorted.js';

function combinationsWithReplacementSize(len, n) {
  if (len === 0 || n === 0 || n > len) return 0;
  return factorial(len + n - 1, len - 1) / factorial(n);
}

export function __combinationsWithReplacement(iterable, n) {
  const arr = __arrayFrom(iterable);
  const len = arr.length;
  let _size = null;

  n = n === undefined ? len : n;

  return {
    *[Symbol.iterator]() {
      const toIndex = (i) => arr[i];

      for (const indices of __product(__arrayFrom(__map(__range(0, n), () => __range(0, len))))) {
        if (__isSorted(indices)) {
          yield [...__map(indices, toIndex)];
        }
      }
    },

    get size() {
      return _size === null ? (_size = combinationsWithReplacementSize(len, n)) : _size;
    },
  };
}

export const combinationsWithReplacement = /*#__PURE__*/ iterableCurry(
  __combinationsWithReplacement,
  {
    reduces: true,
    minArgs: 0,
    maxArgs: 1,
  },
);
