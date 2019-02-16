import { ensureIterable } from './internal/iterable'
import { permutationsSize } from './internal/math'
import map from './map'
import range from './range'
import product from './product'

export default function permutations (iterable, r) {
  const arr = Array.from(ensureIterable(iterable))
  const len = arr.length
  r = r === undefined ? len : r
  return {
    * [Symbol.iterator] () {
      if (r > len) return
      const mapToIndex = map((i) => arr[i])
      for (const indices of product(...map(() => range(len), range(r)))) {
        if (new Set(indices).size === r) {
          yield Array.from(mapToIndex(indices))
        }
      }
    },
    getSize () {
      return permutationsSize(len, r)
    }
  }
}
