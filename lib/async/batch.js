const asyncIter = require('./async-iter')
const range = require('../range')
const map = require('../map')

async function * batch(iter, batchSize) {
  iter = asyncIter(iter)
  batchSize = batchSize || 1
  let b
  while(true) {
    b = await Promise.all(Array.from(map(() => iter.next(), range(batchSize))))
    for (const item of b) {
      if (item.done) {
        return
      }
      yield item.value
    }
  }
}

module.exports = batch
