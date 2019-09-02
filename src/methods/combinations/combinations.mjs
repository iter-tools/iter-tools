import { map } from '../$map/map';
import { range } from '../range/range';
import { permutations } from '../permutations/permutations';
import { iterableCurry } from '../../internal/iterable';
import { combinationsSize } from '../../internal/math';

function isSorted(arr) {
  if (arr.length < 2) return true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
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
