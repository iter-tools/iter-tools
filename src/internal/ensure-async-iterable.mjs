import ensureIterable from './ensure-iterable'

async function * asyncify (iterable) {
  yield * iterable
}

// forceWrap is used whenever I call "next" multiple times without waiting the promises to be fulfilled.
// this should work on generator objects created using generator functions
// http://tc39.github.io/proposal-async-iteration/#table-internal-slots-of-asyncgenerator-instances
// but it might not work if you create a generator object manually

export default function ensureAsyncIterable (i, forceWrap = false) {
  if (i && i[Symbol.asyncIterator] && forceWrap) {
    return asyncify(i)
  } else if (i && i[Symbol.asyncIterator]) {
    return i
  } else {
    return asyncify(ensureIterable(i))
  }
}
