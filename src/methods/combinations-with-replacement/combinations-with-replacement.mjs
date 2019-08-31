import { map } from '../$map/map';
import { range } from '../range/range';
import { product } from '../product/product';
import { iterableCurry } from '../../internal/iterable';
import { combinationsWithReplacementSize } from '../../internal/math';

function isSorted(arr) {
  if (arr.length < 2) return true;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false;
    }
  }
  return true;
}

export function combinationsWithReplacement(r, iterable) {
  const arr = Array.from(iterable);
  const len = arr.length;
  r = r === undefined ? len : r;
  return {
    *[Symbol.iterator]() {
      const toIndex = i => arr[i];

      for (let indices of product(...map(() => range(0, len), range(0, r)))) {
        if (isSorted(indices)) {
          yield Array.from(map(toIndex, indices));
        }
      }
    },
    getSize() {
      return combinationsWithReplacementSize(len, r);
    },
  };
}

export default iterableCurry(combinationsWithReplacement, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
