import asyncIter from './internal/async-iter'
import map from './map'

export default async function * zip (...iterables) {
  const iters = iterables.map(arg => asyncIter(arg))
  while (true) {
    const results = await Promise.all(map(iter => iter.next(), iters))
    const done = results.some(r => r.done)
    if (done) return
    yield results.map(r => r.value)
  }
}
