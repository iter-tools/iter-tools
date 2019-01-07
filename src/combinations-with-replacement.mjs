import map from './map'
import range from './range'
import product from './product'
import tee from './tee'
import ensureIterable from './internal/ensure-iterable'
import factorial from './internal/factorial'

function isSorted (arr) {
  if (arr.length < 2) return true

  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) {
      return false
    }
  }
  return true
}

class CombinationsWithReplacement {
  constructor (iterable, r) {
    this.arr = Array.from(ensureIterable(iterable))
    this.len = this.arr.length
    this.r = typeof r === 'undefined' ? this.len : r
  }

  * [Symbol.iterator] () {
    const mapToIndex = map((i) => this.arr[i])
    for (let indices of product(...tee(range(this.len), this.r))) {
      if (isSorted(indices)) {
        yield Array.from(mapToIndex(indices))
      }
    }
  }

  get length () {
    if (this.len === 0 || this.r === 0 || this.r > this.len) return 0
    return factorial(this.len + this.r - 1) / (factorial(this.r) * factorial(this.len - 1))
  }
}

export default function combinationsWithReplacement (iterable, r) {
  return new CombinationsWithReplacement(iterable, r)
}
