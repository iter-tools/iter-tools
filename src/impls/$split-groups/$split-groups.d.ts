import { $MaybePromise } from '../../../generate/async.macro.cjs';

import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitGroups<T>(
  source: $Wrappable<T>,
): $IterableIterator<[T, $IterableIterator<T>]>;

declare function $splitGroups<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
): (source: $Wrappable<T>) => $IterableIterator<[K, $IterableIterator<T>]>;

declare function $splitGroups<K, T>(
  key: (value: T, i: number) => $MaybePromise<K>,
  source: $Wrappable<T>,
): $IterableIterator<[K, $IterableIterator<T>]>;

export { $splitGroups };
