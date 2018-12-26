const range = require('../es2018/range')
const filter = require('../es2018/filter')

function isEven (x) {
  return (x % 2) === 0
}

const a = Array.from(range(1000))

module.exports['Array filter 1000 items'] = function () {
  return a
    .filter(isEven)
}

module.exports['iter-tools filter 1000 items'] = function () {
  const iter = filter(isEven)
  return Array.from(iter(a))
}
