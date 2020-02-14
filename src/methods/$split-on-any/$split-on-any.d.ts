import { SourceIterable as SyncSourceIterable } from '../../types/iterable';
import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// curried

// prettier-ignore
declare function $splitOnAny(
  separatorValues: SyncSourceIterable<string>,
  compare?: (value: string, item: string) => boolean,
): (source: string) => $ResultIterable<string>;

declare function $splitOnAny(
  separatorValues: SyncSourceIterable<any>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny<V, T>(
  separatorValues: SyncSourceIterable<V>,
  compare: (value: V, item: T) => boolean,
): (source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

// noncurried

// prettier-ignore
declare function $splitOnAny(
  separatorValues: SyncSourceIterable<string>,
  compare: (value: string, item: string) => boolean,
  source: string
): $ResultIterable<string>;

// prettier-ignore
declare function $splitOnAny(
  separatorValues: SyncSourceIterable<string>,
  source: string
): $ResultIterable<string>;

declare function $splitOnAny<V, T>(
  separatorValues: SyncSourceIterable<V>,
  compare: (value: V, item: T) => boolean,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

declare function $splitOnAny<T>(
  separatorValues: SyncSourceIterable<any>,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOnAny;
