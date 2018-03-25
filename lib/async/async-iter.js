const iter = require('../iter')

async function* asyncIter(syncIterable) {
  yield * iter(syncIterable)
}

module.exports = asyncIter
