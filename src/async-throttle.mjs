import { asyncIterableCurry } from './internal/async-iterable'
import delay from './internal/delay'

async function * asyncThrottle (ms, iterable) {
  let waitSince = 0
  for await (const item of iterable) {
    await delay(ms - (Date.now() - waitSince))
    waitSince = Date.now()
    yield item
  }
}

export default asyncIterableCurry(asyncThrottle)
