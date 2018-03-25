const iter = require('./iter')

function reduce (iterable, cb, acc) {
  iterable = iter(iterable)
  let c = 0
  for (const item of iterable) {
    acc = cb(acc, item, c++)
  }
  return acc
}

module.exports = reduce
