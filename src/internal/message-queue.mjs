class QueueItem {
  constructor (data) {
    this.data = data
    this.previous = null
  }
}

class Consumer {
  constructor (queueItem) {
    this.queueItem = queueItem
  }
  isExhausted () {
    return !this.queueItem.previous
  }
  get () {
    if (this.isExhausted()) throw new Error('Consumer is exhausted')
    const data = this.queueItem.previous.data
    this.queueItem = this.queueItem.previous
    return data
  }
}

export default class MessageQueue {
  constructor () {
    this.head = new QueueItem() // an empty queue points to a head node
    this.tail = this.head // initially head and tail are the same
  }

  add (data) {
    const newItem = new QueueItem(data)
    this.tail.previous = newItem
    this.tail = newItem
  }

  spawnConsumer () {
    if (!this.head) throw new Error('You cannot spawn a new consumer after closing')
    return new Consumer(this.head)
  }

  close () {
    this.head = null // this enables to garbage collect all the consumed
  }
}
