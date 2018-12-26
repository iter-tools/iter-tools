const range = require('../es2018/range')
const map = require('../es2018/map')

function power2 (x) {
  return x * x
}

const a = Array.from(range(1000))

module.exports['Array map 1000 items'] = function () {
  return Array.from(a
    .map(power2))
}

module.exports['iter-tools map 1000 items'] = function () {
  const iter = map(power2)
  return Array.from(iter(a))
}
