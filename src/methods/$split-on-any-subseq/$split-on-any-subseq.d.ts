import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T = any>(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
