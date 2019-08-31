import { $isAsync, $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $ensureIterable } from '../../internal/$iterable';
import { Exchange } from '../../internal/queues';

function fetch(state) {
  const { exchange, iterator } = state;

  if ($isAsync) {
    return new Promise((resolve, reject) => {
      iterator
        .next()
        .then(newItem => {
          if (newItem.done) {
            state.done = true;
            state.doneValue = newItem.value;
            return resolve();
          } else {
            exchange.push(newItem.value);
            return resolve();
          }
        })
        .catch(err => reject(err));
    });
  } else {
    const newItem = iterator.next();
    if (newItem.done) {
      state.done = true;
      state.doneValue = newItem.value;
    } else {
      exchange.push(newItem.value);
    }
  }
}

$async;
function returnIterator(state) {
  const { exchange, iterableCounter, iterator } = state;

  if (!exchange.hasRoot() && iterableCounter === 0) {
    if (typeof iterator.return === 'function') $await(iterator.return());
  }
}

$async;
function* generateFork(state, consumer) {
  try {
    state.iterableCounter++;
    yield 'ensure finally';
    while (true) {
      if (!consumer.isEmpty()) {
        yield consumer.shift();
      } else if (state.done) {
        return state.doneValue;
      } else {
        $await(fetch(state));
      }
    }
  } finally {
    state.iterableCounter--;
    $await(returnIterator(state));
  }
}

function* generateForks(state, n) {
  const { exchange } = state;

  try {
    for (let counter = 0; counter < n; counter++) {
      const fork = generateFork(state, exchange.spawnConsumerAtRoot());
      // this first call to "next" allows to initiate the function generator
      // this ensures that "iterableCounter" will be always increased and decreased
      //
      // the default behaviour of a generator is that finally clause is only called
      // if next was called at least once
      fork.next(); // ensure finally
      yield fork;
    }
  } finally {
    exchange.discardRoot();
    returnIterator(state);
  }
}

export function $fork(n = Infinity, iterable) {
  const state = {
    iterator: $ensureIterable(iterable)[$iteratorSymbol](),
    iterableCounter: 0,
    exchange: new Exchange(),
    done: false,
    doneValue: undefined,
  };

  return generateForks(state, n);
}

export default function curriedFork(...args) {
  if (args.length === 2) {
    return $fork(...args);
  }

  if (args.length === 0) {
    return $fork;
  }

  if (typeof args[0] === 'number') {
    return (...args2) => curriedFork(args[0], ...args2);
  }
  return $fork(undefined, args[0]);
}
