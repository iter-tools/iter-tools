const PENDING = 'pending'
const REJECTED = 'rejected'
const FULFILLED = 'fulfilled'

export default function querablePromise (promise) {
  // Don't modify any promise that has been already modified.
  if (promise.isPending) return promise

  let state = PENDING

  // Observe the promise, saving the fulfillment in a closure scope.
  const result = promise
    .then((v) => {
      state = FULFILLED
      return v
    },
    (e) => {
      state = REJECTED
      throw e
    })

  result.isFulfilled = () => state === FULFILLED
  result.isPending = () => state === PENDING
  result.isRejected = () => state === REJECTED
  return result
}
