import { ensureAsyncIterable } from './internal/async-iterable'
import delay from './internal/delay'
import { curry } from './internal/curry'

async function * asyncThrottle (ms, iterable) {
  let waitSince = 0
  for await (const item of ensureAsyncIterable(iterable)) {
    await delay(ms - (Date.now() - waitSince))
    waitSince = Date.now()
    yield item
  }
}

export default curry(asyncThrottle)
