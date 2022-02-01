/* @macrome
 * @generatedby /generate/generators/impls/index.cjs
 * @generatedfrom ./$fork.js#1643837503143
 * This file is autogenerated. Please do not edit it directly.
 * When editing run `npx macrome watch` then change the file this is generated from.
 */
import { IterableIterator } from './iterable-iterator.js';
import { callReturn } from './iterable.js';

// Queue item instances are shared between all forks.
class QueueItem {
  constructor(step) {
    this.step = step;
    this.next = null;
  }
}

class Fork extends IterableIterator {
  constructor(head, exchange) {
    super();

    this.head = head;
    this.done = false;
    this.exchange = exchange;
  }

  next() {
    const { done, exchange } = this;

    if (done) {
      return { value: undefined, done };
    } else {
      let { head } = this;

      if (!head.next) exchange.fetch();

      head = head.next;
      const { step } = head;

      this.done = step.done;
      this.head = head;

      return step;
    }
  }

  return() {
    const { done, exchange } = this;

    if (!done) exchange.return();
    return { value: undefined, done: true };
  }
}

export class Exchange {
  constructor(iterator) {
    this.iterator = iterator;
    this.tail = new QueueItem(null);
    this.head = this.tail;
    this.forks = 0;
  }

  fork() {
    ++this.forks;
    return new Fork(this.tail, this);
  }

  advance() {
    this.tail = this.tail.next;
  }

  fetch() {
    const step = this.iterator.next();
    const newItem = new QueueItem(step);
    this.head.next = this.head = newItem;
  }

  return() {
    --this.forks;
    if (this.forks === 0) {
      callReturn(this.iterator);
    }
    return { value: undefined, done: true };
  }
}
