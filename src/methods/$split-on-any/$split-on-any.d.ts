import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAny(
  values: SyncSourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
  source: string,
): $ResultIterable<string>;

declare function $splitOnAny<T>(
  values: SyncSourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
