import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAny(
  separatorValues: SyncSourceIterable<string>,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAny(
  separatorValues: SyncSourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny(
  separatorValues: SyncSourceIterable<string>,
  source: string,
): $ResultIterable<string>;

declare function $splitOnAny<T>(
  separatorValues: SyncSourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
