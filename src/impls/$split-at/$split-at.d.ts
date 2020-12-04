import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitAt(
  idx: number,
): <T>(source: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

declare function $splitAt<T>(
  idx: number,
  source: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export { $splitAt };
