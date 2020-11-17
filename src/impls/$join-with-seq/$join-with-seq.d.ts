import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWithSeq<W, T>(
  seq: SyncSourceIterable<W>,
  source: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWithSeq<W>(
  seq: SyncSourceIterable<W>,
): <T>(source: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWithSeq;
