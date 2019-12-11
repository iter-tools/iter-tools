import { $iteratorSymbol } from '../../generate/async.macro';

export class $IterableIterator {
  [$iteratorSymbol]() {
    return this;
  }
}
