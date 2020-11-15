class QueueItem {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Consumer {
  constructor(head) {
    this.head = head;
  }

  shift() {
    if (this.isEmpty()) throw new Error('Cannot shift empty queue');
    const { data } = this.head.next;
    this.head = this.head.next;
    return data;
  }

  isEmpty() {
    return !this.head.next;
  }
}

/**
 * Exchanges are a specialized kind of singly linked queues. Conceptually they represent a single queue, but
 * they employ many consumers (heads) each of which consume the queue data at their own pace. A reference
 * to the original head is kept up until `discardRoot` is called, at which point the earlier items can
 * be garbage collected.
 *
 * 0  ->  1  ->  2  ->  3  ->  4  ->  5  ->  6  ->  7  ->  8  ->  9
 * ^                          <-|     ^             ^             ^
 * Root  ...  GC'd when no root |     Head 1        Head 2        Tail
 */
export class Exchange {
  constructor() {
    this.head = this.tail = new QueueItem(null);
  }

  push(data) {
    const newItem = new QueueItem(data);
    this.tail.next = this.tail = newItem;
  }

  hasRoot() {
    return !!this.head;
  }

  spawnConsumerAtRoot() {
    if (!this.head)
      throw new Error('You cannot spawn a new consumer after calling noMoreConsumers');
    return new Consumer(this.head);
  }

  discardRoot() {
    // Allow the GC to collect items
    this.head = null;
  }
}
