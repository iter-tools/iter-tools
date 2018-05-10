function * repeat (obj, times = Infinity) {
  while (times--) {
    yield obj
  }
}

module.exports = repeat
