const asyncIter = require('./async-iter')

async function reduce (iterable, cb, acc) {
  iterable = asyncIter(iterable)
  let c = 0
  for await (const item of iterable) {
    acc = cb(acc, item, c++)
  }
  return acc
}

module.exports = reduce
