import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAny(
  values: SyncSourceIterable<any>,
): <T = any>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
  source: string,
): $ResultIterable<string>;

declare function $splitOnAny<T = any>(
  values: SyncSourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
