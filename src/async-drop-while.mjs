import { asyncIterableCurry } from './internal/async-iterable'

async function * asyncDropWhile (func, iterable) {
  let drop = true
  let c = 0
  for await (const item of iterable) {
    if (!drop) {
      yield item
    } else {
      drop = await func(item, c++)
      if (!drop) {
        yield item
      }
    }
  }
}

export default asyncIterableCurry(asyncDropWhile)
