function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(fn, ms) {
  let timeout;
  let delayed;

  const debounced = (...args) => {
    delayed = () => {
      if (timeout === thisTimeout) {
        timeout = null;
        fn(...args);
      }
    };

    if (timeout) clearTimeout(timeout);
    const thisTimeout = (timeout = setTimeout(delayed, ms));
  };

  Object.assign(debounced, {
    flush() {
      clearTimeout(timeout);
      delayed && delayed();
    },

    cancel() {
      clearTimeout(timeout);
    },
  });

  return debounced;
}

function* filter(predicate, iterable) {
  for (const item of iterable) {
    if (predicate(item)) yield item;
  }
}

function wrapWithArray(maybeArray) {
  return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
}

module.exports = { delay, debounce, filter, wrapWithArray };
