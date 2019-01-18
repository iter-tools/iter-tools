export default function * partitionPart (iterator, readQueue, getWriteQueue, shouldReturn) {
  try {
    while (true) {
      while (readQueue.length) {
        yield readQueue.shift()
      }

      const { value, done } = iterator.next()
      if (done) break

      getWriteQueue(value).push(value)
    }
  } finally {
    shouldReturn() &&
    typeof iterator.return === 'function' &&
    iterator.return()
  }
}
