const iter = require('./iter')

function * zipLongest (filler) {
  let next, i, zipped
  const iters = Array.prototype.slice.call(arguments, 1).map((arg) => iter(arg))
  let numberOfExausted
  while (true) {
    zipped = []
    numberOfExausted = 0
    for (i = 0; i < iters.length; i++) {
      next = iters[i].next()
      if (next.done) {
        numberOfExausted++
      }
      zipped.push(next.done ? filler : next.value)
    }
    if (iters.length === numberOfExausted) {
      return
    }
    yield zipped
  }
}

module.exports = zipLongest
