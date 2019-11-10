import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';
import { WeakExchange } from '../../internal/queues';

import { $window } from '../$window/$window';
import $toAnySubseq from '../../internal/$to-any-subseq';
import { iterableStartsWith_ } from '../$starts-with_/iterable-starts-with_';

const startsWithConfig = { any: false, subseq: true };

function lengthOfFullMatch(buffer, onSubseqs) {
  for (const subsequence of onSubseqs) {
    if (iterableStartsWith_(buffer, startsWithConfig, subsequence)) {
      return subsequence.length;
    }
  }
  return -1;
}

$async;
function fetch(state, separatorSubseqs) {
  const { iterator, weakExchange } = state;

  if (state.partSubseqEnded) {
    return false;
  }

  const { done, value: buffer } = $await(iterator.next());

  state.partSubseqEnded = state.done = done;

  if (!done) {
    state.idx++;

    const matchedLength = lengthOfFullMatch(buffer, separatorSubseqs);
    state.partSubseqEnded = matchedLength > 0;

    for (let i = 0; i < matchedLength - 1; i++) {
      $await(iterator.next());
    }

    if (state.partSubseqEnded) {
      state.consumer = weakExchange.spawnConsumer();
    } else {
      weakExchange.push(buffer.get(0));
    }
  }

  return !state.partSubseqEnded;
}

$async;
function returnIterator(state) {
  const { groupsConsumed, done, idx, nGroups, iterator } = state;

  if (groupsConsumed && !done && idx === nGroups) {
    if (typeof iterator.return === 'function') $await(iterator.return());
  }
}

$async;
function fetchPartSubseq(state, separatorSubseqs, isFirst) {
  if (isFirst && !state.done) return;
  while ($await(fetch(state, separatorSubseqs)));
}

$async;
function* generatePartSubseq(state, separatorSubseqs, consumer, isFirst) {
  try {
    yield 'ensure finally';

    if (isFirst && !consumer.isEmpty()) yield consumer.shift();

    while ($await(fetch(state, separatorSubseqs))) yield consumer.shift();
  } finally {
    returnIterator(state);
  }
}

$async;
export function* $iterableSplitOn_(iterable, config, separator) {
  const separatorSubseqs = $await($toAnySubseq(config, separator))
    .filter(subseq => subseq.length)
    .sort((a, b) => b.length - a.length);

  const maxMatchLength = separatorSubseqs.reduce((max, { length }) => Math.max(max, length), 1);

  const state = {
    iterator: null,
    idx: 0,
    weakExchange: new WeakExchange(),
    consumer: null,
    nGroups: 0,
    groupsConsumed: false,
    partSubseqEnded: false,
  };

  try {
    state.iterator = $window(iterable, maxMatchLength)[$iteratorSymbol]();
    state.consumer = state.weakExchange.spawnConsumer();

    let isFirst = true;
    // We must peek the first item to know if we are done before without yielding any subseq
    $await(fetch(state, separatorSubseqs));

    while (!state.done) {
      state.nGroups++;
      const partSubseq = $await(
        generatePartSubseq(state, separatorSubseqs, state.consumer, isFirst),
      );
      $await(partSubseq.next()); // ensure finally

      yield partSubseq;
      $await(fetchPartSubseq(state, separatorSubseqs, isFirst));

      isFirst = false;
      state.partSubseqEnded = false;
    }
  } finally {
    state.groupsConsumed = true;
    $await(returnIterator(state));
  }
}
