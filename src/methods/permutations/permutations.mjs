import { iterableCurry } from '../../internal/iterable';
import { permutationsSize } from '../../internal/math';
import { map } from '../$map/map';
import { range } from '../range/range';
import { product } from '../product/product';

export function permutations(iterable, r) {
  const arr = Array.from(iterable);
  const len = arr.length;
  r = r === undefined ? len : r;
  return {
    *[Symbol.iterator]() {
      if (r > len) return;
      const toIndex = i => arr[i];
      for (const indices of product(...map(range(0, r), () => range(0, len)))) {
        const set = new Set(indices);
        if (set.size === r) {
          yield Array.from(map(set, toIndex));
        }
      }
    },
    getSize() {
      return permutationsSize(len, r);
    },
  };
}

export default iterableCurry(permutations, {
  reduces: true,
  minArgs: 0,
  maxArgs: 1,
});
