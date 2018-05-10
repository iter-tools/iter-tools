const zip = require('./zip')
const filter = require('./filter')
const map = require('./map')

function compress (iterable, compress) {
  const _map = map(couple => couple[0])
  const _filter = filter(couple => couple[1])
  return _map(_filter(zip(iterable, compress)))
}

module.exports = compress
