/**
 * @generated-from ./$iterable-split-on-any-subseq.js
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import { AsyncPartsIterator, AsyncSpliterator, split } from '../../../internal/async-spliterator';
import { CircularBuffer } from '../../../internal/circular-buffer';
import { iterableStartsWith_ } from '../../$starts-with_/iterable-starts-with_';
import asyncMap from '../../$map/async-map';
import asyncToArray from '../../$to-array/async-to-array';

const startsWithConfig = { any: false, subseq: true };

class AsyncAnySubseqSpliterator extends AsyncSpliterator {
  constructor(sourceIterator, separatorSubseqs) {
    super(sourceIterator);
    const maxMatchLength = separatorSubseqs.reduce((max, { length }) => Math.max(max, length), 1);
    this.separatorSubseqs = separatorSubseqs;
    this.buffer = new CircularBuffer(maxMatchLength);
  }

  static async nullOrInstance(sourceIterator, separatorSubseqs) {
    const inst = new AsyncAnySubseqSpliterator(sourceIterator, separatorSubseqs);
    return (await inst._isEmpty()) ? null : inst;
  }

  async _isEmpty() {
    let item;
    if (!(item = await super.next()).done) {
      this.buffer.push(item.value);
    }
    return item.done;
  }

  getMatchingLength() {
    for (const subsequence of this.separatorSubseqs) {
      if (iterableStartsWith_(this.buffer, startsWithConfig, subsequence)) {
        return subsequence.length;
      }
    }

    return 0;
  }

  async next() {
    let item;
    while (!(this.buffer.isFull() || (item = await super.next()).done)) {
      this.buffer.push(item.value);
    }

    if (!this.buffer.size) {
      return { value: undefined, done: true };
    } else {
      const matchingLength = this.getMatchingLength(this.buffer, this.separatorSubseqs);

      if (matchingLength) {
        for (let i = 0; i < matchingLength; i++) {
          this.buffer.shift();
        }
      }

      return { value: matchingLength ? split : this.buffer.shift(), done: false };
    }
  }
}

export async function* asyncIterableSplitOnAnySubseq(source, separatorSubseqs) {
  const _separatorSubseqs = (await asyncToArray(asyncMap(asyncToArray, separatorSubseqs)))
    .filter(subseq => subseq.length)
    .sort((a, b) => b.length - a.length);

  yield* new AsyncPartsIterator(
    await AsyncAnySubseqSpliterator.nullOrInstance(
      source[Symbol.asyncIterator](),
      _separatorSubseqs,
    ),
  );
}
