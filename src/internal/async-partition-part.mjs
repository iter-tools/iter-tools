export default async function * asyncPartitionPart (iterator, readQueue, getWriteQueue, getPartCount) {
  let exhausted = 0

  try {
    while (true) {
      while (readQueue.length) {
        yield readQueue.shift()
      }

      const { value, done } = await iterator.next()
      if (done) break

      const chosen = await getWriteQueue(value)
      chosen.push(value)
    }
  } finally {
    exhausted += 1

    getPartCount() === exhausted &&
    typeof iterator.return === 'function' &&
    await iterator.return()
  }
}
