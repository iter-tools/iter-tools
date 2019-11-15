import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable, $ResultSubseqIterable } from '../../types/$iterable';

declare function $split(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<any>>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultSubseqIterable<T>>;

declare function $split<T>(
  separatorSubseqs: SyncSourceIterable<$SourceIterable<any>>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultSubseqIterable<T>>;

export default $split;
