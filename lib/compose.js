function compose (fns) {
  return Array.from(fns)
    .reduce(function (f, g) {
      return function () {
        return f(g.apply(this, arguments))
      }
    })
}

module.exports = compose
