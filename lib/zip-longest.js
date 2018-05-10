const iter = require('./iter')

function * zipLongest (filler, ...args) {
  const iters = args.map(x => iter(x))
  while (true) {
    let numberOfExausted = 0
    const zipped = []
    for (const iter of iters) {
      const {done, value} = iter.next()
      if (done) {
        numberOfExausted++
      }
      zipped.push(done ? filler : value)
    }
    if (iters.length === numberOfExausted) {
      return
    }
    yield zipped
  }
}

module.exports = zipLongest
