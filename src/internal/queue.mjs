class QueueItem {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

export class Queue {
  constructor() {
    this.head = this.tail = new QueueItem(null);
  }

  shift() {
    if (this.isEmpty()) throw new Error('Cannot shift empty queue');
    const { data } = this.head.next;
    this.head = this.head.next;

    return data;
  }

  push(data) {
    const newItem = new QueueItem(data);
    this.tail.next = this.tail = newItem;
  }

  isEmpty() {
    return !this.head.next;
  }
}
