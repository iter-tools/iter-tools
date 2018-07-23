import ensureIterable from './ensure-iterable'

async function * asyncify (iterable) {
  yield * iterable
}

export default function ensureAsyncIterable (i) {
  if (i && i[Symbol.asyncIterator]) {
    return i
  } else {
    return asyncify(ensureIterable(i))
  }
}
