import ensureIterable from './internal/ensure-iterable'
import factorial from './internal/factorial'
import map from './map'
import range from './range'
import tee from './tee'
import product from './product'

class Permutations {
  constructor (iterable, r) {
    this.arr = Array.from(ensureIterable(iterable))
    this.len = this.arr.length
    this.r = typeof r === 'undefined' ? this.len : r
  }

  * [Symbol.iterator] () {
    if (this.r > this.len) return
    const mapToIndex = map((i) => this.arr[i])
    for (const indices of product(...tee(range(this.len), this.r))) {
      if (new Set(indices).size === this.r) {
        yield Array.from(mapToIndex(indices))
      }
    }
  }

  get length () {
    if (this.len === 0 || this.r === 0 || this.r > this.len) return 0
    return factorial(this.len) / factorial(this.len - this.r)
  }
}

export default function permutations (iterable, r) {
  return new Permutations(iterable, r)
}
