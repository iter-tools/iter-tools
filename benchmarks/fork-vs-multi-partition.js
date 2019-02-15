const range = require('../es2018/range')
const fork = require('../es2018/fork')
const filter = require('../es2018/filter')
const multiPartition = require('../es2018/multi-partition')

function pos0 (x) {
  return (x % 4) === 0
}

function pos1 (x) {
  return ((x - 1) % 4) === 0
}

function pos2 (x) {
  return ((x - 2) % 4) === 0
}

function pos3 (x) {
  return ((x - 3) % 4) === 0
}

function multiFunc (x) {
  return x % 4
}

const a = Array.from(range(10000))

module.exports['Fork 10000 items'] = function () {
  const [f1, f2, f3, f4] = fork(a)
  Array.from(filter(pos0, f1))
  Array.from(filter(pos1, f2))
  Array.from(filter(pos2, f3))
  Array.from(filter(pos3, f4))
}

module.exports['multipartition 10000 items'] = function () {
  const [by0, by1, by2, by3] = multiPartition(multiFunc, a)
  Array.from(by0)
  Array.from(by1)
  Array.from(by2)
  Array.from(by3)
}
