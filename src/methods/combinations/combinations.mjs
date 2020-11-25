import { iterableCurry } from '../../internal/iterable';
import { factorial } from '../../internal/factorial';
import { map } from '../$map/map';
import { range } from '../range/range';
import { permutations } from '../permutations/permutations';
import { isSorted } from '../$is-sorted/is-sorted';

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

export default iterableCurry(combinations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
