import map from './map'
import range from './range'
import product from './product'
import tee from './tee'
import ensureIterable from './internal/ensure-iterable'
import { combinationsWithReplacementSize } from './internal/math'

function isSorted (arr) {
  if (arr.length < 2) return true

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false
    }
  }
  return true
}

export default function combinationsWithReplacement (iterable, r) {
  const arr = Array.from(ensureIterable(iterable))
  const len = arr.length
  r = r === undefined ? len : r
  return {
    * [Symbol.iterator] () {
      const mapToIndex = map((i) => arr[i])
      for (let indices of product(...tee(range(len), r))) {
        if (isSorted(indices)) {
          yield Array.from(mapToIndex(indices))
        }
      }
    },
    getSize () {
      return combinationsWithReplacementSize(len, r)
    }
  }
}
