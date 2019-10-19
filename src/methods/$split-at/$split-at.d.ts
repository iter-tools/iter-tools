import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitAt(
  position: number,
): <T>(source: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

declare function $splitAt<T>(
  position: number,
  source: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export default $splitAt;
