import { $isSync, $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

const wrappedIterables = [];

class $WrappedIterable {
  constructor(source) {
    this.source = source;
    this.done = false;
    this.started = false;
    this.returned = false;
  }

  @$async
  next() {
    this.started = true;
    const item = $await(this.source.next());
    if (item.done) this.done = true;
    return item;
  }

  @$async
  return(value) {
    if (this.done) {
      throw new Error('Called return on an iterator that was done');
    }
    this.done = true;
    this.returned = true;
    return { value, done: true };
  }

  [$iteratorSymbol]() {
    return this;
  }
}

export function $wrap(iterable) {
  const getIterator = $isSync
    ? iterable[Symbol.iterator]
    : iterable[Symbol.asyncIterator] || iterable[Symbol.iterator];
  const wrapped = new $WrappedIterable(getIterator.call(iterable));
  wrappedIterables.push(wrapped);
  return wrapped;
}

beforeEach(() => {
  wrappedIterables.length = 0;
});

afterEach(() => {
  for (const wrapped of wrappedIterables) {
    if (wrapped.started && !(wrapped.done || wrapped.returned)) {
      throw new Error('Not all iterables returned');
    }
  }
});
