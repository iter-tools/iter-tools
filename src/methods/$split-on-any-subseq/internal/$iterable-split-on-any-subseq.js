import { $async, $await, $iteratorSymbol } from '../../../../generate/async.macro';

import { $PartsIterator, $Spliterator, split } from '../../../internal/$spliterator';
import { CircularBuffer } from '../../../internal/circular-buffer';
import { iterableStartsWith_ } from '../../$starts-with_/iterable-starts-with_';
import $map from '../../$map/$map';
import $toArray from '../../$to-array/$to-array';

const startsWithConfig = { any: false, subseq: true };

class $AnySubseqSpliterator extends $Spliterator {
  constructor(sourceIterator, separatorSubseqs) {
    super(sourceIterator);
    const maxMatchLength = separatorSubseqs.reduce((max, { length }) => Math.max(max, length), 1);
    this.separatorSubseqs = separatorSubseqs;
    this.buffer = new CircularBuffer(maxMatchLength);
  }

  @$async
  static nullOrInstance(sourceIterator, separatorSubseqs) {
    const inst = new $AnySubseqSpliterator(sourceIterator, separatorSubseqs);
    return $await(inst._isEmpty()) ? null : inst;
  }

  @$async
  _isEmpty() {
    let item;
    if (!(item = $await(super.next())).done) {
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

  @$async
  next() {
    let item;
    while (!(this.buffer.isFull() || (item = $await(super.next())).done)) {
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

$async;
export function* $iterableSplitOnAnySubseq(source, separatorSubseqs) {
  const _separatorSubseqs = $await($toArray($map($toArray, separatorSubseqs)))
    .filter(subseq => subseq.length)
    .sort((a, b) => b.length - a.length);

  yield* new $PartsIterator(
    $await($AnySubseqSpliterator.nullOrInstance(source[$iteratorSymbol](), _separatorSubseqs)),
  );
}
