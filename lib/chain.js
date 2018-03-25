const iter = require('./iter')

function * chain () {
  for (let i = 0; i < arguments.length; i++) {
    yield * iter(arguments[i])
  }
}

module.exports = chain
