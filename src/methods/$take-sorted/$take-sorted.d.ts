import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $takeSorted<T>(iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $takeSorted<T>(n: number): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeSorted<T>(
  func: (a: T, b: T) => number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeSorted<T>(n: number, source: $SourceIterable<T>): $ResultIterable<T>;

declare function $takeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

declare function $takeSorted<T>(
  func: (a: T, b: T) => number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $takeSorted;
