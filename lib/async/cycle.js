const asyncIter = require('./async-iter')
const syncCycle = require('../cycle')

async function * cycle (iterable) {
  const copy = []
  for await (const item of asyncIter(iterable)) {
    copy.push(item)
    yield item
  }
  yield * cycle(copy)
}

module.exports = cycle
