export default async function * asyncify (iterable) {
  if (iterable[Symbol.asyncIterator]) {
    yield * iterable
  } else {
    for (const item of iterable) {
      yield Promise.resolve(item)
    }
  }
}
