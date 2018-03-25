const asyncIter = require('./async-iter')

async function asyncIterToArray(iterable) {
  const out = []
  for await (const item of asyncIter(iterable)) {
    console.log(item)
    out.push(item)
  }
  return out
}

module.exports = asyncIterToArray
