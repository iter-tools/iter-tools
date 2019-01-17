const range = require('../es2018/range')
const asyncMap = require('../es2018/async-map')
const asyncReduce = require('../es2018/async-reduce')

const delay = (n) => new Promise((resolve) => setTimeout(resolve, n))

async function power2 (x) {
  await delay(20)
  return x * x
}

function concat (acc, n) {
  return acc.concat(n)
}

const a = Array.from(range(100))

module.exports['iter-tools async map 100 items'] = {
  fn: async function (deferred) {
    const iter = asyncMap(power2)

    await asyncReduce([], concat, iter(a))
    deferred.resolve()
  },
  defer: true
}

module.exports['iter-tools async map 100 parallel items'] = {
  fn: async function (deferred) {
    const iter = asyncMap(4, power2)

    await asyncReduce([], concat, iter(a))
    deferred.resolve()
  },
  defer: true
}
