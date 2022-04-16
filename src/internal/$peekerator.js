import { $isSync, $iteratorSymbol, $async, $await } from '../../generate/async.macro.cjs';

import { $ensureIterable, $callReturn } from './$iterable.js';

const _ = Symbol.for('_');

class $PeekeratorIterator {
  constructor(peekr) {
    this.peekr = peekr;
  }

  @$async
  next() {
    const { peekr } = this;
    const { current } = peekr;
    $await(peekr.advance());
    return current;
  }

  @$async
  return() {
    $await(this.peekr.return());
    return { value: undefined, done: true };
  }

  [$iteratorSymbol]() {
    return this;
  }
}

export class $Peekerator {
  @$async
  static from(iterable, ...args) {
    const iterator = $ensureIterable(iterable)[$iteratorSymbol]();
    const first = $await(iterator.next());
    return new this(iterator, first, ...args);
  }

  constructor(iterator, first) {
    this[_] = {
      iterator,
      current: first,
      index: 0,
    };
  }

  get current() {
    return this[_].current;
  }

  get value() {
    return this[_].current.value;
  }

  get done() {
    return this[_].current.done;
  }

  get index() {
    return this[_].index;
  }

  advance() {
    if ($isSync) {
      const this_ = this[_];

      if (!this_.current.done) {
        this_.current = $await(this_.iterator.next());
        this_.index++;
      }

      return this;
    } else {
    }
  }

  @$async
  return() {
    const this_ = this[_];
    if (!this.done) {
      $await($callReturn(this_.iterator));
    }
    this_.current = { value: undefined, done: true };
    return this;
  }

  asIterator() {
    return new $PeekeratorIterator(this);
  }
}
