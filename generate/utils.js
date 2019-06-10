function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(fn, ms) {
  let promise;

  return (...args) => {
    const thisPromise = promise = delay(ms).then(() => {
      if (promise === thisPromise) {
        promise = null;
        fn(...args);
      }
    });
  };
}

module.exports = { delay, debounce };
