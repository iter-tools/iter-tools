import ensureIterable from './internal/ensure-iterable'
import { permutationsSize } from './internal/math'
import map from './map'
import range from './range'
import fork from './fork'
import product from './product'

export default function permutations (iterable, r) {
  const arr = Array.from(ensureIterable(iterable))
  const len = arr.length
  r = r === undefined ? len : r
  return {
    * [Symbol.iterator] () {
      if (r > len) return
      const mapToIndex = map((i) => arr[i])
      for (const indices of product(...fork(r, range(len)))) {
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
