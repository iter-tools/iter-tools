import { $iteratorSymbol } from '../../generate/async.macro.cjs';

export class $IterableIterator {
  [$iteratorSymbol]() {
    return this;
  }
}
