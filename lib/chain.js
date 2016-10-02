function* chain() {
  for (var i = 0; i < arguments.length; i++) {
    yield* arguments[i];
  }
}

module.exports = chain;
