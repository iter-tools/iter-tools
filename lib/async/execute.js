async function * execute (func) {
  const args = Array.prototype.slice.call(arguments, 1)
  while (true) {
    yield func.apply(this, args)
  }
}

module.exports = execute
