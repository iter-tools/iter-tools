import { $isAsync, $async, $await, $iteratorSymbol } from '../../../generate/async.macro.cjs';

import { $iterableCurry, $callReturn } from '../../internal/$iterable.js';
import { Exchange } from './internal/exchange.js';

function fetch(state) {
  const { exchange, iterator } = state;

  if ($isAsync) {
    return new Promise((resolve, reject) => {
      iterator
        .next()
        .then((step) => {
          if (step.done) {
            state.done = true;
            state.doneValue = step.value;
            return resolve();
          } else {
            exchange.push(step.value);
            return resolve();
          }
        })
        .catch((err) => reject(err));
    });
  } else {
    const step = iterator.next();
    if (step.done) {
      state.done = true;
      state.doneValue = step.value;
    } else {
      exchange.push(step.value);
    }
  }
}

$async;
function returnIterator(state) {
  const { exchange, iterableCounter, iterator } = state;

  if (!exchange.hasRoot() && iterableCounter === 0) {
    $await($callReturn(iterator));
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

function* generateForks(source, state) {
  const { exchange } = state;

  state.iterator = source[$iteratorSymbol]();

  try {
    while (true) {
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

export function $fork(source) {
  const state = {
    iterator: null,
    iterableCounter: 0,
    exchange: new Exchange(),
    done: false,
    doneValue: undefined,
  };

  return generateForks(source, state);
}

export default $iterableCurry($fork, {
  forceSync: true,
});
