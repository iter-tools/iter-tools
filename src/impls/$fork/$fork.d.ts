import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $fork<T>(source: $SourceIterable<T>): SyncResultIterable<$ResultIterable<T>>;

declare function $fork<T>(
  n: number,
): (source: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

declare function $fork<T>(
  n: number,
  source: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export default $fork;
