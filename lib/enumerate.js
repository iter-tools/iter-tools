const range = require('./range')
const zip = require('./zip')

function enumerate (iterable, start = 0) {
  return zip(range({start}), iterable)
}

module.exports = enumerate
