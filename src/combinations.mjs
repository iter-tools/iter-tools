import map from './map'
import range from './range'
import permutations from './permutations'
import ensureIterable from './internal/ensure-iterable'
import { combinationsSize } from './internal/math'

function isSorted (arr) {
  if (arr.length < 2) return true

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false
    }
  }
  return true
}

export default function combinations (iterable, r) {
  const arr = Array.from(ensureIterable(iterable))
  const len = arr.length
  r = r === undefined ? len : r
  return {
    * [Symbol.iterator] () {
      const mapToIndex = map((i) => arr[i])

      for (let indices of permutations(range(len), r)) {
        if (isSorted(indices)) {
          yield Array.from(mapToIndex(indices))
        }
      }
    },
    getSize () {
      return combinationsSize(len, r)
    }
  }
}
