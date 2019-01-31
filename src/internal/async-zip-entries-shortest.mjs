import { ensureAsyncIterable } from './async-iterable'

export default async function * zipEntriesShortest (iterables) {
  let iters = []
  let exhaustedIndex = null

  try {
    iters = iterables.map(i => ensureAsyncIterable(i)[Symbol.asyncIterator]())
    const items = new Array(iters.length)

    while (true) {
      for (let i = 0; i < iters.length; i++) {
        const item = await iters[i].next()
        if (item.done) {
          exhaustedIndex = i
          return
        }
        items[i] = item
      }

      yield items
    }
  } finally {
    if (iters) {
      for (let i = 0; i < iters.length; i++) {
        if (i !== exhaustedIndex && typeof iters[i].return === 'function') {
          iters[i].return()
        }
      }
    }
  }
}
