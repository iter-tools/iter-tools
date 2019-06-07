function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function debounce(fn, waitMs) {
  let promise;

  return (...args) => {
    const thisPromise = promise = wait(waitMs).then(() => {
      if (promise === thisPromise) {
        promise = null;
        fn(...args);
      }
    });
  };
}

module.exports = { wait, debounce };
