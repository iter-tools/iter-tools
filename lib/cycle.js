const iter = require('./iter')

function * cycle (iterable) {
  let copy
  if (Array.isArray(iterable)) {
    while (true) {
      yield * iterable
    }
  } else {
    copy = []
    for (const item of iter(iterable)) {
      copy.push(item)
      yield item
    }
    yield * cycle(copy)
  }
}

module.exports = cycle
