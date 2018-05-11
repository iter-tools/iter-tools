async function * execute (func, ...args) {
  while (true) {
    yield func(...args)
  }
}

module.exports = execute
