import { $async, $await } from '../../generate/async.macro.cjs';

import { $IterableIterator } from './$iterable-iterator.js';
import { $callReturn } from './$iterable.js';

// Queue item instances are shared between all forks.
class QueueItem {
  constructor(step) {
    this.step = step;
    this.next = null;
  }
}

class $Fork extends $IterableIterator {
  constructor(head, exchange) {
    super();

    this.head = head;
    this.done = false;
    this.exchange = exchange;
  }

  @$async
  next() {
    const { done, exchange } = this;

    if (done) {
      return { value: undefined, done };
    } else {
      let { head } = this;

      if (!head.next) $await(exchange.fetch());

      head = head.next;
      const { step } = head;

      this.done = step.done;
      this.head = head;

      return step;
    }
  }

  @$async
  return() {
    const { done, exchange } = this;

    if (!done) $await(exchange.return());
    return { value: undefined, done: true };
  }
}

export class $Exchange {
  constructor(iterator) {
    this.iterator = iterator;
    this.tail = new QueueItem(null);
    this.head = this.tail;
    this.forks = 0;
  }

  fork() {
    ++this.forks;
    return new $Fork(this.tail, this);
  }

  advance() {
    this.tail = this.tail.next;
  }

  @$async
  fetch() {
    const step = $await(this.iterator.next());
    const newItem = new QueueItem(step);
    this.head.next = this.head = newItem;
  }

  @$async
  return() {
    --this.forks;
    if (this.forks === 0) {
      $await($callReturn(this.iterator));
    }
    return { value: undefined, done: true };
  }
}
