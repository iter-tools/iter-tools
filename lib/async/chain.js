const asyncIter = require('./async-iter')

async function * chain () {
  for (let i = 0; i < arguments.length; i++) {
    yield * asyncIter(arguments[i])
  }
}

module.exports = chain
