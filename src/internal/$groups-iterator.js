import { $async, $await } from '../../generate/async.macro';

import { $PartsIterator, $PartIterator } from './$parts-iterator';
import { split } from './symbols';
import { $wrap } from './$wrap';

export class $GroupsIterator extends $PartsIterator {
  @$async
  next() {
    if (!this.initialized) $await(this.init());
    const { spliterator } = this;

    if (this.currentPart !== null) {
      if (spliterator.value !== split || spliterator.current === this.splitItem) {
        // this part was not consumed
        this.currentPart.inactive = true;

        while (!spliterator.done && spliterator.value !== split) {
          $await(spliterator.advance());
        }
      }
    }

    if (spliterator.done) {
      return { value: undefined, done: true };
    }

    // consume the split
    $await(spliterator.advance());

    if (spliterator.done || spliterator.value === split) {
      throw new Error('Unexpected empty group');
    }

    const key = spliterator.value;

    $await(spliterator.advance());

    // The spliterator is now at the first item of the next part.
    // We save the item because an empty part would be represented by
    // [split, split] and we need to know if we've advanced from the
    // first split to the second, thus consuming the empty part.
    this.splitItem = spliterator.current;

    this.currentPart = new $PartIterator(this);
    return { value: [key, $wrap(this.currentPart)], done: false };
  }
}
