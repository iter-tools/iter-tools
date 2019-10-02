import { SourceIterable as SyncSourceIterable } from '../../internal/iterable';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $split(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T = any>(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
  iterable: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
