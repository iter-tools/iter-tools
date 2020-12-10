import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $map<O, T>(
  func: (value: T, i: number) => $MaybePromise<O>,
): (source: $Wrappable<T>) => $IterableIterator<O>;

declare function $map<O, T>(
  func: (value: T, i: number) => $MaybePromise<O>,
  source: $Wrappable<T>,
): $IterableIterator<O>;

export { $map };
