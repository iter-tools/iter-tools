var range = require('../es2018/range')

const a = range(2000)

module.exports['for loop'] = function () {
  const arr = []
  for (const i of a) {
    arr.push(i)
  }
}

module.exports['while'] = function () {
  const arr = []
  while (true) {
    const next = a.next()
    if (next.done) break
    arr.push(next.value)
  }
}
