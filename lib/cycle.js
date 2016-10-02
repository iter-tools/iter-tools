function* cycle(iterable) {
  while (true) {
    yield* iterable;
  }
}

module.exports = cycle;
