import ensureAsyncIterable from './internal/ensure-async-iterable'

function delay (ms) {
  if (ms <= 0) return Promise.resolve()
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function * asyncThrottle (ms, iterable) {
  let waitSince = 0
  for await (const item of ensureAsyncIterable(iterable)) {
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
