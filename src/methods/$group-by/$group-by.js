import { $, $async, $await, $iteratorSymbol } from '../../../generate/async.macro';
import { $iterableCurry } from '../../internal/$iterable';
import { $EntryIterable } from '../../internal/$entry-iterable';
import { WeakExchange } from '../../internal/queues';

let warnedNullGetKeyDeprecation = false;

const warnNullGetKeyDeprecation = () => {
  if (!warnedNullGetKeyDeprecation) {
    console.warn(
      `\`${$`groupBy`}(null, iterable)\` is deprecated and will be removed in iter-tools@8. ` +
        `Instead use ${$`group`}(iterable)`,
    );
    warnedNullGetKeyDeprecation = true;
  }
};

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
export function* $groupBy(source, getKey) {
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

  if (getKey == null) {
    warnNullGetKeyDeprecation();
  }

  const _getKey = getKey == null ? k => k : getKey;

  try {
    state.iterator = source[$iteratorSymbol]();
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
    $await(returnIterator(state));
  }
}

export default $iterableCurry($groupBy, {
  IterableClass: $EntryIterable,
});
