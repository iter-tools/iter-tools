import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncTap (func, iterable) {
  let c = 0
  for await (const item of iterable) {
    await func(item, c++)
    yield item
  }
}

export default asyncIterableCurry(asyncTap)
