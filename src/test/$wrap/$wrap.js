import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

const wrappedIterables = [];

$async;
function* $wrap_(iterable) {
  yield* iterable;
}

class $TestWrapper {
  constructor(source, deep = false) {
    this.source = source[$iteratorSymbol]();
    this.deep = deep;
    this.started = false;
    this.returned = false;
    this.done = false;

    wrappedIterables.push(this);
  }

  @$async
  next() {
    this.started = true;
    const { done, value } = $await(this.source.next());
    this.done = done;

    return {
      value: this.deep && Array.isArray(value) ? new $TestWrapper($wrap_(value), true) : value,
      done,
    };
  }

  @$async
  return(value) {
    if (this.done) {
      throw new Error('Called return on an iterator that was done');
    }
    this.returned = this.done = true;
    $await(this.source.return());
    return { value, done: true };
  }

  [$iteratorSymbol]() {
    return this;
  }
}

export function $wrap(iterable) {
  return new $TestWrapper($wrap_(iterable));
}

export function $wrapDeep(iterable) {
  return new $TestWrapper($wrap_(iterable), true);
}

beforeEach(() => {
  wrappedIterables.length = 0;
});

afterEach(() => {
  for (const wrapped of wrappedIterables) {
    if (wrapped.started && !wrapped.done) {
      throw new Error('Not all iterables returned');
    }
  }
});
