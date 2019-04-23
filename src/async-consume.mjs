import { asyncIterableCurry } from './internal/async-iterable'

async function asyncConsume (func = () => {}, iterable) {
  let c = 0
  for await (const item of iterable) {
    await func(item, c++)
  }
}

export default asyncIterableCurry(asyncConsume, { variadic: false, reduces: true, minArgs: 0, maxArgs: 1 })
