import ensureAsyncIterable from './internal/ensure-async-iterable'

export default async function * chain (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * ensureAsyncIterable(iterable)
  }
}
