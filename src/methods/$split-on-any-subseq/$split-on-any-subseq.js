import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $PartsIterator, $Spliterator, split } from '../../internal/$spliterator';
import { CircularBuffer } from '../../internal/circular-buffer';
import { startsWithAnySubseq } from '../$starts-with-any-subseq/starts-with-any-subseq';
import $map from '../$map/$map';
import $toArray from '../$to-array/$to-array';

class $AnySubseqSpliterator extends $Spliterator {
  constructor(sourceIterator, separatorSubseqs, equals) {
    super(sourceIterator);
    this.separatorSubseqs = separatorSubseqs;
    this.equals = equals;

    const maxMatchLength = separatorSubseqs.reduce((max, { length }) => Math.max(max, length), 1);
    this.buffer = new CircularBuffer(maxMatchLength);
  }

  @$async
  static nullOrInstance(sourceIterator, separatorSubseqs, equals) {
    const inst = new $AnySubseqSpliterator(sourceIterator, separatorSubseqs, equals);
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
      if (startsWithAnySubseq(this.buffer, [subsequence], this.equals)) {
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
export function* $splitOnAnySubseq(source, separatorSubseqs, equals) {
  const _separatorSubseqs = $await($toArray($map($toArray, separatorSubseqs)))
    .filter(subseq => subseq.length)
    .sort((a, b) => b.length - a.length);

  yield* new $PartsIterator(
    $await(
      $AnySubseqSpliterator.nullOrInstance(source[$iteratorSymbol](), _separatorSubseqs, equals),
    ),
  );
}

export default $iterableCurry($splitOnAnySubseq, {
  maxArgs: 2,
  optionalArgsAtEnd: true,
});
