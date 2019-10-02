import { SourceIterable as SyncSourceIterable } from '../../internal/iterable';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $joinWithSubseq<W, T = any>(
  subseq: SyncSourceIterable<W>,
  iterable: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWithSubseq<W>(
  subseq: SyncSourceIterable<W>,
): <T = any>(iterable: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWithSubseq;
