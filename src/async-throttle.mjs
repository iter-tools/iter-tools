import asyncIter from './async-iter'

function delay (ms) {
  if (ms <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function * asyncThrottle (ms, iterable) {
  let waitSince = Infinity
  for await (const item of asyncIter(iterable)) {
    await delay(ms - (Date.now() - waitSince))
    waitSince = Date.now()
    yield item
  }
}

export default function curriedAsyncThrottle (ms, iterable) {
  if (!iterable) {
    return iterable => asyncThrottle(ms, iterable)
  }
  return asyncThrottle(ms, iterable)
}
