const compose = require('../lib/compose')
const measureSpeed = require('measure-speed')
const filter = require('../lib/filter')
const map = require('../lib/map')
const reduce = require('../lib/reduce')
const regexpExec = require('../lib/regexp-exec')

function generateCurrentAccount (nlines) {
  const lines = []
  lines.push('transaction id;businness code;money in;money out')
  for (var i = 0; i < nlines; i++) {
    lines.push(`${i};AAA123;${(Math.random() * 1000).toFixed(2)};${(Math.random() * 1000).toFixed(2)}`)
  }
  return lines.join('\n')
}

function matches2numbers (match) {
  return [parseFloat(match[1]), -parseFloat(match[2])]
}

function filterNegative (numbers) {
  return numbers[0] + numbers[1] > 0
}

function lazyRegexp () {
  var csv = generateCurrentAccount(1000)

  measureSpeed(function () {
    var regIter = regexpExec(/^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm)
    var mapper = map(matches2numbers)
    var superIter = compose([filter(filterNegative), mapper, regIter])
    reduce(superIter(csv), (acc, item) => acc + item[0] + item[1], 0)
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ regexp iterator ************')
    console.log(ms)
  })

  measureSpeed(function () {
    var re = /^[0-9]+;[A-Z]{3}[0-9]*;([0-9.]*);([0-9.]*)/gm
    var transactions = []
    var match
    while ((match = re.exec(csv)) !== null) {
      transactions.push(match)
    }
    transactions.map(matches2numbers)
      .filter(filterNegative)
      .reduce((acc, item) => acc + item[0] + item[1], 0)
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ regexp vanilla ************')
    console.log(ms)
  })
}

module.exports = {
  lazyRegexp: lazyRegexp
}
