import { $async, $await, $iteratorSymbol } from '../../../../generate/async.macro';
import { WeakExchange } from '../../../internal/queues';

function startNextSubsequence(state) {
  state.subsequenceEnded = false;
}

$async;
function fetch(state, predicate) {
  const { iterator, weakExchange } = state;

  if (state.subsequenceEnded) {
    return false;
  }

  const { done, value } = $await(iterator.next());
  state.done = done;

  state.subsequenceEnded = done;

  if (!done) {
    state.subsequenceEnded = $await(predicate(value, state.idx++));
    if (state.subsequenceEnded) {
      state.consumer = weakExchange.spawnConsumer();
    } else {
      weakExchange.push(value);
    }
  }

  return !state.subsequenceEnded;
}

$async;
function returnIterator(state) {
  const { groupsConsumed, done, idx, nGroups, iterator } = state;

  if (groupsConsumed && !done && idx === nGroups) {
    if (typeof iterator.return === 'function') $await(iterator.return());
  }
}

$async;
function fetchSubsequence(state, predicate) {
  while ($await(fetch(state, predicate)));
}

$async;
function* generateSubsequence(state, predicate, consumer) {
  try {
    yield 'ensure finally';

    while ($await(fetch(state, predicate))) yield consumer.shift();
  } finally {
    returnIterator(state);
  }
}

$async;
function* $iterableSplitWith(source, predicate) {
  const state = {
    iterator: null,
    idx: 0,
    weakExchange: new WeakExchange(),
    consumer: null,
    nGroups: 0,
    groupsConsumed: false,
    subsequenceEnded: false,
  };

  try {
    state.iterator = source[$iteratorSymbol]();
    state.consumer = state.weakExchange.spawnConsumer();

    while (!state.done) {
      state.nGroups++;
      const subsequence = generateSubsequence(state, predicate, state.consumer);
      $await(subsequence.next()); // ensure finally

      yield subsequence;
      $await(fetchSubsequence(state, predicate));
      startNextSubsequence(state);
    }
  } finally {
    state.groupsConsumed = true;
    $await(returnIterator(state));
  }
}

export default $iterableSplitWith;
