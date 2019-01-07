import ensureIterable from './internal/ensure-iterable'

function * multiply (iterable1, iterable2) {
  for (const item1 of iterable1) {
    for (const item2 of iterable2) {
      yield item1.concat(item2)
    }
  }
}

function * empty () {}

class Product {
  constructor (...args) {
    this.iters = args.map(i => Array.from(ensureIterable(i)))
  }

  [Symbol.iterator] () {
    if (this.iters.length === 0) return empty()
    let currentIter = [[]]
    for (const it of this.iters) {
      currentIter = multiply(currentIter, it)
    }
    return currentIter
  }

  get length () {
    if (this.iters.length === 0) return 0
    const lengths = this.iters
      .map((iter) => iter.length)

    return lengths
      .reduce((acc, value) => acc * value, 1)
  }
}

export default function product (...args) {
  return new Product(...args)
}
