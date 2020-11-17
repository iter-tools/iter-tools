import { $async, $await } from '../../generate/async.macro.cjs';

import { split } from './symbols.js';
import { $IterableIterator } from './$iterable-iterator.js';
import { $Peekerator } from './$peekerator.js';
import { $wrap } from './$wrap.js';

export class $PartIterator extends $IterableIterator {
  constructor(partsIterator) {
    super();
    // This feels like an unnecessarily tight coupling just to call maybeReturnSource
    // Is it possible to just take spliterator?
    this.partsIterator = partsIterator;
    // A part is inactive if the next part was requested.
    // We are inactive if we know the spliterator state changed externally,
    // meaning current values in spliterator would belong to a different part.
    this.inactive = false;
    this.done = false;
  }

  assertActive() {
    if (this.inactive && !this.done) {
      throw new Error('Cannot take from this split part. It is no longer the active part.');
    }
  }

  @$async
  next() {
    const { spliterator } = this.partsIterator;
    const { current } = spliterator;

    this.assertActive();

    if (this.done || current.done || current.value === split) {
      this.done = true;
      $await(this.partsIterator.maybeReturnSource());
      return { value: undefined, done: true };
    } else {
      $await(spliterator.advance());

      return current;
    }
  }

  @$async
  return() {
    this.done = true;
    $await(this.partsIterator.maybeReturnSource());
    return { value: undefined, done: true };
  }

  @$async
  throw() {
    return $await(this.return());
  }
}

/**
 * Present a spliterator (an iterator that sometimes yields a split sentinel value)
 * as an iterator of part iterators. The parts must be consumed in order.
 */
export class $PartsIterator extends $IterableIterator {
  constructor(source, strategy, options) {
    super();
    this.source = source;
    this.strategy = strategy;
    this.options = options;

    this.initialized = false;
    this.returned = false;
    this.spliterator = null;
    this.currentPart = null;
    this.splitItem = null;
  }

  @$async
  init() {
    this.initialized = true;
    const { source, strategy, options } = this;
    this.spliterator = $await($Peekerator.from(strategy(split, options, source)));
  }

  @$async
  maybeReturnSource() {
    if (this.spliterator && this.returned && this.currentPart.done) {
      $await(this.spliterator.return());
    }
  }

  @$async
  next() {
    if (!this.initialized) $await(this.init());
    const { spliterator } = this;

    if (spliterator.done) {
      return { value: undefined, done: true };
    }

    if (this.currentPart !== null) {
      if (spliterator.value !== split || spliterator.current === this.splitItem) {
        // this part was not consumed
        this.currentPart.inactive = true;

        while (!spliterator.done && spliterator.value !== split) {
          $await(spliterator.advance());
        }
      }
      // consume the split
      $await(spliterator.advance());
    }

    // The spliterator is now at the first item of the next part.
    // We save the item because an empty part would be represented by
    // [split, split] and we need to know if we've advanced from the
    // first split to the second, thus consuming the empty part.
    this.splitItem = spliterator.current;

    this.currentPart = new $PartIterator(this);
    return { value: $wrap(this.currentPart), done: false };
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
    return $await(this.return());
  }
}
