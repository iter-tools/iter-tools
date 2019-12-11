import { $, $async, $await, $iteratorSymbol } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $PartsIterator, $Spliterator, split } from '../../internal/$spliterator';

let warnedNullGetKeyDeprecation = false;

const warnNullGetKeyDeprecation = () => {
  if (!warnedNullGetKeyDeprecation) {
    console.warn(
      `\`${$`groupBy`}(null, iterable)\` is deprecated and will be removed in iter-tools@8. ` +
        `Instead use ${$`group`}(iterable)`,
    );
    warnedNullGetKeyDeprecation = true;
  }
};

class $GroupingSpliterator extends $Spliterator {
  constructor(sourceIterator, getKey) {
    super(sourceIterator);
    this.getKey = getKey;
    this.key = undefined;
    this.item = null;
    this.idx = 0;
  }

  @$async
  static nullOrInstance(sourceIterator, getKey) {
    const inst = new $GroupingSpliterator(sourceIterator, getKey);
    return $await(inst._isEmpty()) ? null : inst;
  }

  @$async
  _isEmpty() {
    $await(this.buffer());
    return this.item.done;
  }

  @$async
  buffer() {
    const { key } = this;
    if (this.item === null) {
      this.item = $await(super.next());
      const { done, value } = this.item;
      if (!done) {
        this.key = $await(this.getKey(value, this.idx++));
      }
    }
    return this.key !== key;
  }

  @$async
  next() {
    const newGroup = $await(this.buffer());

    if (this.item.done) {
      return { value: undefined, done: true };
    } else {
      const { value } = this.item;

      if (!newGroup) {
        this.item = null;
      }

      return { value: newGroup ? split : value, done: false };
    }
  }
}

class $GroupPartsIterator extends $PartsIterator {
  @$async
  next() {
    const item = $await(super.next());
    if (!item.done) {
      $await(this.spliterator.buffer());
      return { value: [this.spliterator.key, item.value], done: false };
    } else {
      return item;
    }
  }
}

$async;
export function* $groupBy(source, getKey) {
  if (getKey === null) {
    warnNullGetKeyDeprecation();
  }

  yield* new $GroupPartsIterator(
    $await(
      $GroupingSpliterator.nullOrInstance(
        source[$iteratorSymbol](),
        getKey === null ? _ => _ : getKey,
      ),
    ),
  );
}

export default $iterableCurry($groupBy);
