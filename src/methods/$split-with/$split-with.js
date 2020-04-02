import { $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $PartsIterator, $Spliterator, split } from '../../internal/$spliterator';

class $PredicateSpliterator extends $Spliterator {
  constructor(sourceIterator, predicate) {
    super(sourceIterator);
    this.predicate = predicate;
    this.item = null;
    this.idx = 0;
  }

  @$async
  static nullOrInstance(sourceIterator, predicate) {
    const inst = new $PredicateSpliterator(sourceIterator, predicate);
    return $await(inst._isEmpty()) ? null : inst;
  }

  @$async
  _isEmpty() {
    this.item = $await(super.next());
    return this.item.done;
  }

  @$async
  next() {
    if (this.item === null) {
      this.item = $await(super.next());
    }

    if (this.item.done) {
      return { value: undefined, done: true };
    } else {
      const { value } = this.item;
      const shouldSplit = this.predicate(value, this.idx++);
      this.item = null;

      return { value: shouldSplit ? split : value, done: false };
    }
  }
}

$async;
export function* $splitWith(source, predicate) {
  yield* new $PartsIterator(
    $await($PredicateSpliterator.nullOrInstance(source[$iteratorSymbol](), predicate)),
  );
}

export default $iterableCurry($splitWith);
