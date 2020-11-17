import { iterableCurry } from '../../internal/iterable.js';
import { factorial } from '../../internal/factorial.js';
import { map } from '../$map/map.js';
import { range } from '../range/range.js';
import { permutations } from '../permutations/permutations.js';
import { isSorted } from '../$is-sorted/is-sorted.js';

function combinationsSize(len, n) {
  if (len === 0 || n === 0 || n > len) return 0;
  return factorial(len, len - n) / factorial(n);
}

export function combinations(iterable, n) {
  const arr = [...iterable];
  const len = arr.length;
  let _size = null;

  n = n === undefined ? len : n;

  return {
    *[Symbol.iterator]() {
      const toIndex = (i) => arr[i];

      for (const indices of permutations(range(0, len), n)) {
        if (isSorted(indices)) {
          yield [...map(indices, toIndex)];
        }
      }
    },

    get size() {
      return _size === null ? (_size = combinationsSize(len, n)) : _size;
    },
  };
}

export default /*#__PURE__*/ iterableCurry(combinations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
