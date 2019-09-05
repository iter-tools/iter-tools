import { iterableCurry } from '../../internal/iterable';
import factorial from '../../internal/factorial';
import { map } from '../$map/map';
import { range } from '../range/range';
import { permutations } from '../permutations/permutations';
import { isSorted } from '../$is-sorted/is-sorted';

function combinationsSize(len, r) {
  if (len === 0 || r === 0 || r > len) return 0;
  return Number(factorial(len) / (factorial(r) * factorial(len - r)));
}

export function combinations(iterable, r) {
  const arr = [...iterable];
  const len = arr.length;
  let _size = null;

  r = r === undefined ? len : r;

  return {
    *[Symbol.iterator]() {
      const toIndex = i => arr[i];

      for (let indices of permutations(range(0, len), r)) {
        if (isSorted(indices)) {
          yield [...map(indices, toIndex)];
        }
      }
    },

    get size() {
      return _size === null ? (_size = combinationsSize(len, r)) : _size;
    },
  };
}

export default iterableCurry(combinations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
