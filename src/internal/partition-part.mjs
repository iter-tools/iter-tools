export default function * partitionPart (iterator, readQueue, getWriteQueue, getPartCount) {
  let exhausted = 0

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
    exhausted += 1

    getPartCount() === exhausted &&
    typeof iterator.return === 'function' &&
    iterator.return()
  }
}
