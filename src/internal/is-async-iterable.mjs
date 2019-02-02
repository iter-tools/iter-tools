export default function isAsyncIterable (i) {
  return Boolean(i && i[Symbol.asyncIterator])
}
