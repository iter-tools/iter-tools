import isAsyncIterable from './is-async-iterable'

export default async function * asyncify (iterable) {
  if (isAsyncIterable(iterable)) {
    yield * iterable
  } else {
    // it should be enough "yield * iterable", but it is broken with es5 version
    for (const item of iterable) {
      yield Promise.resolve(item)
    }
  }
}
