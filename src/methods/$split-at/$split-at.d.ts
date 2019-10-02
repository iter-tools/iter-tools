import { ResultIterable as SyncResultIterable } from '../../internal/iterable';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $splitAt(
  position: number,
): <T = any>(iterable: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

declare function $splitAt<T = any>(
  position: number,
  iterable: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export default $splitAt;
