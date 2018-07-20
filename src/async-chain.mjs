import asyncIter from './internal/async-iter'

export default async function * chain (...arrayOfIter) {
  for (const iterable of arrayOfIter) {
    yield * asyncIter(iterable)
  }
}
