import { ensureAsyncIterable } from './internal/async-iterable'

export default async function * asyncConcat (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureAsyncIterable(iterable)
  }
}
