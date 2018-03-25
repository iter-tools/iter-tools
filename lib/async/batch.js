const asyncIter = require('./async-iter')
const range = require('../range')
const map = require('../map')

async function * batch(iter, batchSize) {
  let end = false
  iter = asyncIter(iter)
  batchSize = batchSize || 1
  let b
  while(!end) {
    b = await Promise.all(Array.from(map(() => asyncIter.next(), range(batchSize))))
    for (const item in b) {
      if (b.done) {
        end = true
        break
      }
      yield b.value
    }

  }
}

module.exports = batch
