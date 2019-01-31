import { ensureIterable } from './iterable'

export default function * zipEntriesShortest (iterables) {
  let iters = []
  let exhaustedIndex = null

  try {
    iters = iterables.map(i => ensureIterable(i)[Symbol.iterator]())
    const items = new Array(iters.length)

    while (true) {
      for (let i = 0; i < iters.length; i++) {
        const item = iters[i].next()
        if (item.done) {
          exhaustedIndex = i
          return
        }
        items[i] = item
      }

      yield items
    }
  } finally {
    for (let i = 0; i < iters.length; i++) {
      if (i !== exhaustedIndex && typeof iters[i].return === 'function') {
        iters[i].return()
      }
    }
  }
}
