import { SourceIterable as SyncSourceIterable } from '../../internal/iterable';
import { $SourceIterable, $ResultIterable } from '../../internal/$iterable';

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
): (iterable: string) => $ResultIterable<string>;

declare function $splitOnAny(
  values: SyncSourceIterable<any>,
): <T = any>(iterable: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny(
  values: SyncSourceIterable<string>,
  iterable: string,
): $ResultIterable<string>;

declare function $splitOnAny<T = any>(
  values: SyncSourceIterable<any>,
  iterable: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
