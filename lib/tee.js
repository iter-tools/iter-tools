const range = require('./range')
const map = require('./map')
const iter = require('./iter')
const Dequeue = require('dequeue')

function tee (iterable, number) {
  number = number || 2
  iterable = iter(iterable)
  const arrays = Array.from(map(() => new Dequeue(), range(number)))
  let done = false
  function * teeGen (a) {
    let newItem
    while (true) {
      if (a.length) {
        yield a.shift()
      } else {
        if (done) {
          return
        }
        newItem = iterable.next()
        if (newItem.done) {
          done = true
          return
        } else {
          arrays.forEach((ar) => ar.push(newItem.value))
          yield a.shift()
        }
      }
    }
  }
  return arrays.map((a) => teeGen(a))
}

module.exports = tee
