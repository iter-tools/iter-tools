import range from './range'
import map from './map'
import ensureAsyncIterable from './internal/ensure-async-iterable'
import MessageQueue from './internal/message-queue'

export default function tee (iterable, number) {
  number = number || 2
  const iterator = ensureAsyncIterable(iterable)[Symbol.asyncIterator]()
  let exhausted = 0
  const messageQueue = new MessageQueue()
  let done = false

  function fetch () {
    return new Promise((resolve, reject) => {
      iterator.next()
        .then((newItem) => {
          if (newItem.done) {
            done = true
            return resolve()
          } else {
            messageQueue.add(newItem.value)
            return resolve()
          }
        })
        .catch((err) => reject(err))
    })
  }

  async function * teeGen (a) {
    try {
      while (true) {
        if (!a.isExhausted()) {
          yield a.get()
        } else if (done) {
          return
        } else {
          await fetch()
        }
      }
    } finally {
      exhausted++
      if (exhausted === number) {
        if (typeof iterator.return === 'function') await iterator.return()
      }
    }
  }
  const array = Array.from(map(() => teeGen(messageQueue.spawnConsumer()), range(number)))
  messageQueue.close()
  return array
}
