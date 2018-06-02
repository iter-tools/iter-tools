const range = require('../es2018/range')
const asyncFilter = require('../es2018/async-filter')
const filter = require('../es2018/filter')

const measureSpeed = require('measure-speed')

function asyncf() {
  const f1 = filter((n) => n % 2)

  const f2 = asyncFilter((n) => n % 2)

  measureSpeed(function () {
    let sum = 0
    for (const n of f1(range(1000))) {
      sum += n
    }
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ sync ************')
    console.log(ms)
  })

  measureSpeed(async function () {
    let sum = 0
    for await (const n of f2(range(1000))) { // eslint-disable-line
      sum += n
    }
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ async ************')
    console.log(ms)
  })
}

module.exports = {
  async: asyncf,
}
