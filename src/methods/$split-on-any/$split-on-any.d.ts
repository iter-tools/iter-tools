import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable, $ResultSubseqIterable } from '../../types/$iterable';

declare function splitOnAny(
  separatorValues: SyncSourceIterable<string>,
): (source: string) => $ResultIterable<string>;

declare function splitOnAny(
  separatorValues: SyncSourceIterable<string>,
  source: string,
): $ResultIterable<string>;

declare function $splitOnAny(
  separatorValues: SyncSourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultSubseqIterable<T>>;

declare function $splitOnAny<T>(
  separatorValues: SyncSourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultSubseqIterable<T>>;

export default $splitOnAny;
