import ensureIterable from './internal/ensure-iterable'
import map from './map'
import range from './range'
import tee from './tee'
import product from './product'

export default function * permutations (iterable, r) {
  const arr = Array.from(ensureIterable(iterable))
  const mapToIndex = map(function (i) { return arr[i] })
  const n = arr.length
  r = typeof r === 'undefined' ? n : r
  if (r > n) return
  for (const indices of product(...tee(range(n), r))) {
    if (new Set(indices).size === r) {
      yield Array.from(mapToIndex(indices))
    }
  }
}
