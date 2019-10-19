import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $split(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $split<T>(
  subseqs: SyncSourceIterable<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $split;
