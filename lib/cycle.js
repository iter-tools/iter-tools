function* cycle(iterable) {
  var copy;
  if (Array.isArray(iterable)) {
    while (true) {
      yield* iterable;
    }
  } else {
    copy = [];
    for (var item of iterable) {
      copy.push(item);
      yield item;
    }
    yield* cycle(copy);
  }
}

module.exports = cycle;
