import { ensureAsyncIterable } from './internal/async-iterable'
import pickByComparison from './internal/collate/pick-by-comparison'
import pickByPosition from './internal/collate/pick-by-position'

async function * collate (stepOrComparator, iterables) {
  const iters = iterables.map(i => ensureAsyncIterable(i)[Symbol.asyncIterator]())
  const itersExhausted = new Array(iters.length).fill(false)
  const items = new Array(iters.length)

  let pickFunc
  if (typeof stepOrComparator === 'number') {
    pickFunc = pickByPosition(stepOrComparator)
  } else if (typeof stepOrComparator === 'function') {
    pickFunc = pickByComparison(stepOrComparator)
  } else {
    throw new TypeError('collate was passed an invalid stepOrComparator value')
  }

  async function takeFromIterable (i) {
    const item = await iters[i].next()
    itersExhausted[i] = !!item.done
    items[i] = item.done ? undefined : item
  }

  for (let i = 0; i < iters.length; i++) {
    await takeFromIterable(i)
  }

  try {
    while (!itersExhausted.every(x => x)) {
      const chosen = pickFunc(items)

      yield items[chosen].value

      await takeFromIterable(chosen)
    }
  } catch (e) {
    for (let i = 0; i < iters.length; i++) {
      if (!itersExhausted[i] && typeof iters[i].return === 'function') {
        iters[i].return()
      }
    }
    throw e
  }
}

export default function curriedCollate (stepOrComparator, ...iterables) {
  if (stepOrComparator[Symbol.asyncIterator] || stepOrComparator[Symbol.iterator]) {
    iterables.unshift(stepOrComparator)
    stepOrComparator = 1
  }
  if (!iterables.length) {
    return (...iterables) => collate(stepOrComparator, iterables)
  }

  return collate(stepOrComparator, iterables)
}
