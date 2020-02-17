import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $sort<T>(iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $sort<T>(
  compareEquality: (a: T, b: T) => number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $sort<T>(
  compareEquality: (a: T, b: T) => number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $sort;
