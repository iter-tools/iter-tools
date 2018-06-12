import asyncIter from './async-iter'

function delay(ms) {
  if (ms <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function asyncThrottle(ms, iterable) {
  async function * _asyncThrottle(iterable) {
    let waitSince = Infinity
    for await (const item of asyncIter(iterable)) {
      await delay(ms - (Date.now() - waitSince))
      waitSince = Date.now()
      yield item
    }
  }

  if (iterable) {
    return _asyncThrottle(iterable)
  }
  return _asyncThrottle
}
