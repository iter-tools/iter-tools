export default function raceTo(predicate, notFoundValue, promises) {
  return new Promise((resolve, reject) => {
    let promiseCount = 0;
    let settledPromiseCount = 0;
    let resolved = false;
    let rejected = false;
    for (const promise of promises) {
      promise
        .catch(error => {
          if (!rejected && !resolved) {
            reject(error);
            rejected = true;
          }
        })
        .then(result => {
          settledPromiseCount++;
          if (!resolved && !rejected) {
            if (predicate(result)) {
              resolve(result);
              resolved = true;
            } else if (settledPromiseCount === promiseCount) {
              resolve(notFoundValue);
            }
          }
        });
      promiseCount++;
    }
  });
}
