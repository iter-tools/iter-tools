var compose = require('../dist/compose')
var measureSpeed = require('measure-speed')
var range = require('../dist/range')
var filter = require('../dist/filter')
var map = require('../dist/map')

function power2 (x) {
  return x * x
}

function isEven (x) {
  return (x % 2) === 0
}

function forVsWhileInIterators () {
  measureSpeed(function () {
    var a = range(2000)
    var arr = []
    for (var i of a) {
      arr.push(i)
    }
    return arr
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ for loop iterator ************')
    console.log(ms)
  })

  // var iter = compose([map(power2), filter(isEven)])
  measureSpeed(function () {
    var a = range(2000)
    var next
    var arr = []
    while (true) {
      next = a.next()
      if (next.done) break
      arr.push(next.value)
    }
    return arr
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ while loop iterator ************')
    console.log(ms)
  })
}

function filterMapArrayVsIter () {
  var a = Array.from(range(1000))
  measureSpeed(function () {
    var result = a
      .map(power2)
      .filter(isEven)
    return result
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ map/filter array ************')
    console.log(ms)
  })

  var arr = Array.from(range(1000))

  var iter = compose([map(power2), filter(isEven)])

  measureSpeed(function () {
    var result = Array.from(iter(arr))
    return result
  }, { samples: 1000, discard: 10 }, function (err, ms) {
    if (err) return console.log('Error!')
    console.log('************ map/filter iter ************')
    console.log(ms)
  })
}

module.exports = {
  forVsWhileInIterators: forVsWhileInIterators,
  filterMapArrayVsIter: filterMapArrayVsIter
}
