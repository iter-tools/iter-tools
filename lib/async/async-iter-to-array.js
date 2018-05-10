const asyncIter = require('./async-iter')

async function asyncIterToArray(iterable) {
  const out = []
  for await (const item of asyncIter(iterable)) {
    out.push(item)
  }
  return out
}

module.exports = asyncIterToArray
