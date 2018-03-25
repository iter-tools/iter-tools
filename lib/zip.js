const iter = require('./iter')

function * zip () {
  let next, i, zipped
  const iters = Array.prototype.map.call(arguments, (arg) => iter(arg))
  while (true) {
    zipped = []
    for (i = 0; i < iters.length; i++) {
      next = iters[i].next()
      if (next.done) return
      zipped.push(next.value)
    }
    yield zipped
  }
}

module.exports = zip
