import asyncIter from './async-iter'

export default async function * zipLongest (filler) {
  const iters = Array.prototype.slice.call(arguments, 1).map((arg) => asyncIter(arg))
  while (true) {
    const results = await Promise.all(iters.map((iter) => iter.next()))
    const done = results.every((r) => r.done)
    if (done) return
    yield results.map((r) => r.done ? filler : r.value)
  }
}
