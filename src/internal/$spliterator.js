import { $async, $await } from '../../generate/async.macro';

import { $IterableIterator } from './$iterable-iterator';
import { $IteratorProxy } from './$iterator-proxy';
import { $consumeIterator } from './$consume-iterator';

export const split = Symbol('split');

$async;
function* $wrap(source) {
  yield* source;
}

export class $PartIterator extends $IterableIterator {
  constructor(partsIterator) {
    super();
    this.partsIterator = partsIterator;
    this.spliterator = partsIterator.spliterator;
  }

  assertActive() {
    if (this !== this.partsIterator.activePart) {
      throw new Error('Cannot take from this split part. It is no longer the active part.');
    }
  }

  @$async
  next() {
    this.assertActive();

    const item = $await(this.spliterator.next());

    if (item.value === split) {
      this.partsIterator.activePart = null;
      $await(this.partsIterator.maybeReturnSource());
      return { value: undefined, done: true };
    } else if (item.done) {
      this.partsIterator.sourceDone = true;
      return { value: undefined, done: true };
    } else {
      return item;
    }
  }

  @$async
  return(value) {
    this.assertActive();

    this.partsIterator.activePart = null;
    $await(this.partsIterator.maybeReturnSource());
    return { value, done: true };
  }

  @$async
  throw(error) {
    this.assertActive();

    $await(this.spliterator.throw(error));
    return { value: undefined, done: true };
  }
}

/**
 * Takes a spliterator -- an iterator that sometimes returns a special split sentinel value,
 * and presents it as an iterator of part iterators, where the part iterators must be
 * consumed in order.
 */
export class $PartsIterator extends $IterableIterator {
  constructor(spliterator) {
    super();
    this.spliterator = spliterator;
    this.sourceDone = false;
    this.returned = false;
    this.activePart = null;
  }

  @$async
  maybeReturnSource() {
    if (this.returned && !this.activePart) {
      $await(this.spliterator.return());
    }
  }

  @$async
  next() {
    if (this.activePart) {
      $await($consumeIterator(this.activePart));
    }

    if (this.spliterator === null || this.sourceDone) {
      // When source is empty force Iterable[] instead of Iterable[Iterable[]].
      return { value: undefined, done: true };
    } else {
      this.activePart = new $PartIterator(this);
      return { value: $wrap(this.activePart), done: false };
    }
  }

  @$async
  return(value) {
    // There will be no more parts.
    this.returned = true;
    $await(this.maybeReturnSource());
    return { value, done: true };
  }

  @$async
  throw() {
    // This looks a little odd, but its what my finally blocks normally do
    return this.return();
  }
}

export class $Spliterator extends $IteratorProxy {}
