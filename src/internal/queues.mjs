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
  isEmpty () {
    return !this.queueItem.previous
  }
  shift () {
    if (this.isEmpty()) throw new Error('Queue is empty')
    const data = this.queueItem.previous.data
    this.queueItem = this.queueItem.previous
    return data
  }
}

export class Queue {
  constructor () {
    this.head = new QueueItem() // an empty queue points to a head node
    this.tail = this.head // initially head and tail are the same
  }

  push (data) {
    const newItem = new QueueItem(data)
    this.tail.previous = newItem
    this.tail = newItem
  }

  shift () {
    if (this.isEmpty()) throw new Error('Queue is empty')
    const data = this.head.previous.data
    this.head = this.head.previous
    return data
  }

  isEmpty () {
    return !this.head.previous
  }
}

export class Exchange extends Queue {
  shift () {
    throw new Error('Unsupported')
  }

  spawnConsumer () {
    if (!this.head) throw new Error('You cannot spawn a new consumer after setting calling producerOnly')
    return new Consumer(this.head)
  }

  noMoreConsumers () {
    // this enables to garbage collect all the consumed items
    this.head = null
  }
}

export const fakeQueue = { push: () => {} }
