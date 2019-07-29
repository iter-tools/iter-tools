import { $async, $await, $iteratorSymbol } from '../generate/async.macro';
import { $iterableCurry } from './internal/$iterable';
import { WeakExchange } from './internal/queues';

$async;
function fetch(state, getKey, expectedKey = {}) {
  const { iterator, weakExchange } = state;
  const { done, value } = $await(iterator.next());

  state.done = done;

  if (!done) {
    const key = $await(getKey(value, state.idx++));
    state.item = { value, key };

    if (expectedKey !== key) {
      state.consumer = weakExchange.spawnConsumer();
    }
    weakExchange.push(state.item);
  }
}

$async;
function returnIterator(state) {
  const { groupsConsumed, done, idx, nGroups, iterator } = state;

  if (groupsConsumed && !done && idx === nGroups) {
    if (typeof iterator.return === 'function') $await(iterator.return());
  }
}

$async;
function fetchGroup(state, getKey, key) {
  while (!state.done && state.item.key === key) $await(fetch(state, getKey, key));
}

$async;
function* generateGroup(state, getKey, key, consumer) {
  try {
    yield 'ensure finally';

    do {
      if (consumer.peek().key !== key) break;

      const cachedItem = consumer.shift();

      if (consumer.isEmpty()) $await(fetch(state, getKey, key));

      yield cachedItem.value;
    } while (!(state.done && consumer.isEmpty()));
  } finally {
    $await(returnIterator(state));
  }
}

$async;
function* $groupBy(getKey, iterable) {
  const state = {
    iterator: null,
    idx: 0,
    weakExchange: new WeakExchange(),
    consumer: null,
    done: false,
    item: null,
    nGroups: 0,
    groupsConsumed: false,
  };

  const _getKey = getKey == null ? k => k : getKey;

  try {
    state.iterator = iterable[$iteratorSymbol]();
    state.consumer = state.weakExchange.spawnConsumer();

    $await(fetch(state, _getKey));

    while (!state.done) {
      const { key } = state.item;

      state.nGroups++;

      const group = $await(generateGroup(state, _getKey, key, state.consumer));

      $await(group.next()); // ensure finally

      yield [key, group];

      $await(fetchGroup(state, _getKey, key));
    }
  } finally {
    state.groupsConsumed = true;
    returnIterator(state);
  }
}

export default $iterableCurry($groupBy);
