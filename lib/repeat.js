function* repeat(obj, times) {
  times = typeof times === 'undefined' ? Infinity : times;
  while (times--) {
    yield obj;
  }
}

module.exports = repeat;
