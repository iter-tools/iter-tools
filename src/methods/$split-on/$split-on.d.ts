import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

// curried

// prettier-ignore
declare function $splitOn(
  separatorValue: string,
  compare?: (value: string, item: string) => boolean,
): (source: string) => $ResultIterable<string>;

declare function $splitOn(
  separatorValue: any,
): <T>(source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

declare function $splitOn<V, T>(
  separatorValue: V,
  compare: (value: V, item: T) => boolean,
): (source: $SourceIterable<T>) => $ResultIterable<$ResultIterable<T>>;

// noncurried

// prettier-ignore
declare function $splitOn(
  separatorValue: string,
  compare: (value: string, item: string) => boolean,
  source: string
): $ResultIterable<string>;

// prettier-ignore
declare function $splitOn(
  separatorValue: string,
  source: string
): $ResultIterable<string>;

declare function $splitOn<V, T>(
  separatorValue: V,
  compare: (value: V, item: T) => boolean,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

declare function $splitOn<T>(
  separatorValue: any,
  source: $SourceIterable<T>,
): $ResultIterable<$ResultIterable<T>>;

export default $splitOn;
