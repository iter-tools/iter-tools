import { $async, $await } from '../../generate/async.macro';

import { IterableIterator } from './iterable-iterator';
import { $PartsIterator } from './$parts-iterator';

/**
 * Split an iterable into two parts.
 * Since we know there will be two parts always present them synchronously.
 * This enables consumption as `const [first, second] = asyncMethod(...)`;
 * Any currying of the results must be done with `{ forceSync: true }`
 */
export class $Bisector extends IterableIterator {
  constructor(source, strategy, options) {
    super();
    this.source = source;
    this.strategy = strategy;
    this.options = options;

    this.partsIterator = null;
    this.firstPart = null;
    this.secondPart = null;
    this.currentIdx = 0;
  }

  @$async
  setupFirst() {
    const { source, strategy, options } = this;
    this.partsIterator = this.partsIterator || new $PartsIterator(source, strategy, options);
    this.firstPart = this.firstPart || $await(this.partsIterator.next()).value;
  }

  // never async
  next() {
    const self = this;
    switch (this.currentIdx++) {
      case 0:
        return {
          value: $async(function*() {
            $await(self.setupFirst());

            yield* self.firstPart;
          })(),
          done: false,
        };

      case 1:
        return {
          value: $async(function*() {
            $await(self.setupFirst());

            self.secondPart = $await(self.partsIterator.next()).value;

            yield* self.secondPart;
          })(),
          done: false,
        };

      default:
        return { value: undefined, done: true };
    }
  }

  return() {
    // If one part is taken but not the other we could never safely call
    // return() on the source in the async version.
    // TODO could I allow taking only one part if it is done before any
    // values are consumed from source?
    // e.g. const [first] = asyncBisectingMethod(...);
    // Should be unnecessary.. splitAt => slice, splitWhen => takeWhile
    if (this.currentIdx === 1) {
      // Generator syntax will not let you do this.
      // You can't throw an error safely inside a finally block
      throw new Error('You must take both parts of a bisector or neither.');
    }
    return { value: undefined, done: true };
  }
}
