class QueueItem {
  constructor (data) {
    this.data = data
    this.previous = null
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
  clone () {
    return new Consumer(this.queueItem)
  }
}

export class Exchange {
  constructor (queueItem) {
    this.tail = new QueueItem() // an empty queue points to a tail node
  }

  push (data) {
    const newItem = new QueueItem(data)
    this.tail.previous = newItem
    this.tail = newItem
  }

  getConsumer () {
    return new Consumer(this.tail)
  }
}

export const fakeQueue = { push: () => {} }
