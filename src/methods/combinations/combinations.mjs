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

export function combinations(r, iterable) {
  const arr = Array.from(iterable);
  const len = arr.length;

  r = r === undefined ? len : r;

  return {
    *[Symbol.iterator]() {
      const toIndex = i => arr[i];

      for (let indices of permutations(r, range(0, len))) {
        if (isSorted(indices)) {
          yield Array.from(map(toIndex, indices));
        }
      }
    },
    getSize() {
      return combinationsSize(len, r);
    },
  };
}

export default iterableCurry(combinations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
