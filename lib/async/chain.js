const asyncIter = require('./async-iter')

async function * chain (...args) {
  for (let i = 0; i < args.length; i++) {
    yield * asyncIter(args[i])
  }
}

module.exports = chain
