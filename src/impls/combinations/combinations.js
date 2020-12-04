import { iterableCurry } from '../../internal/iterable.js';
import { factorial } from '../../internal/factorial.js';
import { __map } from '../$map/map.js';
import { __range } from '../range/range.js';
import { __permutations } from '../permutations/permutations.js';
import { __isSorted } from '../$is-sorted/is-sorted.js';

function combinationsSize(len, n) {
  if (len === 0 || n === 0 || n > len) return 0;
  return factorial(len, len - n) / factorial(n);
}

export function __combinations(iterable, n) {
  const arr = [...iterable];
  const len = arr.length;
  let _size = null;

  n = n === undefined ? len : n;

  return {
    *[Symbol.iterator]() {
      const toIndex = (i) => arr[i];

      for (const indices of __permutations(__range(0, len), n)) {
        if (__isSorted(indices)) {
          yield [...__map(indices, toIndex)];
        }
      }
    },

    get size() {
      return _size === null ? (_size = combinationsSize(len, n)) : _size;
    },
  };
}

export const combinations = /*#__PURE__*/ iterableCurry(__combinations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
