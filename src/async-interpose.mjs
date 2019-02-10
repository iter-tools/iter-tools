import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncInterpose (interposeItem, iterable) {
  let first = true
  for await (const item of iterable) {
    if (!first) {
      yield interposeItem
    }
    yield item
    first = false
  }
}

export default asyncIterableCurry(asyncInterpose)
