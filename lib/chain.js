const iter = require('./iter')

function * chain (...args) {
  for (const iterable of args) {
    yield * iter(iterable)
  }
}

module.exports = chain
