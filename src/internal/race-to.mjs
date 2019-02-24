export default function raceTo (predicate, notFoundValue, promises) {
  return new Promise(resolve => {
    let promiseCount = 0
    let settledPromiseCount = 0
    let resolved = false
    for (const promise of promises) {
      promise
        .then(result => {
          if (predicate(result)) {
            resolve(result)
            resolved = true
          }
        })
        .finally(() => {
          settledPromiseCount++
          if (!resolved && settledPromiseCount === promiseCount) {
            resolve(notFoundValue)
          }
        })
      promiseCount++
    }
  })
}
