import ensureIterable from './internal/ensure-iterable'
import MessageQueue from './internal/message-queue'
import range from './range'
import map from './map'

export default function tee (iterable, number) {
  number = number || 2
  const iterator = ensureIterable(iterable)[Symbol.iterator]()

  let exhausted = 0
  const messageQueue = new MessageQueue()
  let done = false

  function fetch () {
    const newItem = iterator.next()
    if (newItem.done) {
      done = true
    } else {
      messageQueue.add(newItem.value)
    }
  }

  function * teeGen (a) {
    try {
      while (true) {
        if (!a.isExhausted()) {
          yield a.get()
        } else if (done) {
          return
        } else {
          fetch()
        }
      }
    } finally {
      exhausted++
      if (exhausted === number) {
        if (typeof iterator.return === 'function') iterator.return()
      }
    }
  }
  const array = Array.from(map(() => teeGen(messageQueue.spawnConsumer()), range(number)))
  messageQueue.close()
  return array
}
