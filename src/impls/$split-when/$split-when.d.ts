import { IterableIterator as SyncIterableIterator } from '../../types/iterable';
import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
): (source: $Wrappable<T>) => SyncIterableIterator<$IterableIterator<T>>;

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
  source: $Wrappable<T>,
): SyncIterableIterator<$IterableIterator<T>>;

export { $splitWhen };
