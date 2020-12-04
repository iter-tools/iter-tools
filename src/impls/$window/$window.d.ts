import { $SourceIterable, $ResultIterable } from '../../types/$iterable';
import { ResultIterable as SyncResultIterable } from '../../types/iterable';

declare function $window<T>(
  size: number,
  source: $SourceIterable<T>,
): $ResultIterable<SyncResultIterable<T>>;

declare function $window(
  size: number,
): <T>(source: $SourceIterable<T>) => $ResultIterable<SyncResultIterable<T>>;

export { $window };
