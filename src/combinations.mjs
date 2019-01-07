import map from './map'
import range from './range'
import permutations from './permutations'
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

class Combinations {
  constructor (iterable, r) {
    this.arr = Array.from(ensureIterable(iterable))
    this.len = this.arr.length
    this.r = typeof r === 'undefined' ? this.len : r
  }

  * [Symbol.iterator] () {
    const mapToIndex = map((i) => this.arr[i])

    for (let indices of permutations(range(this.len), this.r)) {
      if (isSorted(indices)) {
        yield Array.from(mapToIndex(indices))
      }
    }
  }

  get length () {
    if (this.len === 0 || this.r === 0 || this.r > this.len) return 0
    return factorial(this.len) / (factorial(this.r) * factorial(this.len - this.r))
  }
}

export default function combinations (iterable, r) {
  return new Combinations(iterable, r)
}
