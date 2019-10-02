import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWithSubseq<W, T = any>(
  subseq: SyncSourceIterable<W>,
  source: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWithSubseq<W>(
  subseq: SyncSourceIterable<W>,
): <T = any>(source: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWithSubseq;
