import { $iteratorSymbol, $async, $await } from '../../generate/async.macro';

import { $ensureIterable, $callReturn } from './$iterable';

const _ = Symbol.for('_');

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
    return this[_].current.index;
  }

  @$async
  advance() {
    const this_ = this[_];
    this_.index++;
    this_.current = $await(this_.iterator.next());
  }

  @$async
  return() {
    const this_ = this[_];
    if (!this.done) {
      $await($callReturn(this_.iterator));
    }
    this_.current = { value: undefined, done: true };
  }
}
