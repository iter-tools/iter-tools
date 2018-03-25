const asyncIter = require('./async-iter')

async function * zip () {
  let next, i, zipped
  const iters = Array.prototype.map.call(arguments, (arg) => asyncIter(arg))
  while (true) {
    zipped = []
    for (i = 0; i < iters.length; i++) {
      next = await iters[i].next()
      if (next.done) return
      zipped.push(next.value)
    }
    yield zipped
  }
}

module.exports = zip
