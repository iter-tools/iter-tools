const iter = require('./iter')
const map = require('./map')
const range = require('./range')
const tee = require('./tee')
const product = require('./product')

function * permutations (iterable, r) {
  const arr = Array.from(iter(iterable))
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

module.exports = permutations
