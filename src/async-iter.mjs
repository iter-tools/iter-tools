import iter from './iter'

export default async function * asyncIter (iterable, ...args) {
  if (iterable && iterable[Symbol.asyncIterator]) {
    yield * iterable
  } else {
    yield * iter(iterable)
  }
}
