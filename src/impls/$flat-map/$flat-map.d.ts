import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $flatMap<O, T>(
  func: (value: T, i: number) => $MaybePromise<$Wrappable<O>>,
): (source: $Wrappable<T>) => $IterableIterator<O>;

declare function $flatMap<O, T>(
  func: (value: T, i: number) => $MaybePromise<$Wrappable<O>>,
  source: $Wrappable<T>,
): $IterableIterator<O>;

export { $flatMap };
