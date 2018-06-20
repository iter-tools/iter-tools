import asyncIter from './async-iter'

export default async function * zip () {
  const iters = Array.prototype.map.call(arguments, (arg) => asyncIter(arg))
  while (true) {
    const results = await Promise.all(iters.map((iter) => iter.next()))
    const done = results.some((r) => r.done)
    if (done) return
    yield results.map((r) => r.value)
  }
}
