const iter = require('./iter')

function product () {
  const iters = Array.prototype.map.call(arguments, (i) => iter(i))

  function * multiply (iterable1, iterable2) {
    for (const item1 of iterable1) {
      for (const item2 of iterable2) {
        yield item1.concat(item2)
      }
    }
  }

  if (iters.length === 0) {
    return function * () {}
  } else {
    let currentIter = [[]]
    for (const it of iters) {
      currentIter = multiply(currentIter, Array.from(it))
    }
    return currentIter
  }
}

module.exports = product
