import { ResultIterable as SyncResultIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// prettier-ignore
declare function $splitAt(
  idx: number,
): (source: string) => SyncResultIterable<string>;

declare function $splitAt(
  idx: number,
): <T>(source: $SourceIterable<T>) => SyncResultIterable<$ResultIterable<T>>;

// prettier-ignore
declare function $splitAt(
  idx: number,
  source: string
): SyncResultIterable<string>;

declare function $splitAt<T>(
  idx: number,
  source: $SourceIterable<T>,
): SyncResultIterable<$ResultIterable<T>>;

export default $splitAt;
