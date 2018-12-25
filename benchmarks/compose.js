const compose = require('../es2018/compose')
const range = require('../es2018/range')
const filter = require('../es2018/filter')
const map = require('../es2018/map')

function power2 (x) {
  return x * x
}

function isEven (x) {
  return (x % 2) === 0
}

const a = Array.from(range(1000))

module.exports['Array map and filter'] = function () {
  a
    .map(power2)
    .filter(isEven)
}

module.exports['iter-tools map and filter'] = function () {
  const iter = compose(map(power2), filter(isEven))
  Array.from(iter(a))
}
