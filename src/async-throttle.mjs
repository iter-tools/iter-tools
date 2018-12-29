import ensureAsyncIterable from './internal/ensure-async-iterable'
import delay from './internal/delay'

async function * asyncThrottle (ms, iterable) {
  let waitSince = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    await delay(ms - (Date.now() - waitSince))
    waitSince = Date.now()
    yield item
  }
}

export default function curriedAsyncThrottle (ms, iterable) {
  if (arguments.length === 1) {
    return iterable => asyncThrottle(ms, iterable)
  }
  return asyncThrottle(ms, iterable)
}
