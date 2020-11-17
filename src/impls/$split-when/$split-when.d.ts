import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
): (source: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

declare function $splitWhen<T>(
  predicate: (value: T, i: number) => any,
  source: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export default $splitWhen;
