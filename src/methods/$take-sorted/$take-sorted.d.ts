import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $takeSorted<T = any>(iterable: $SourceIterable<T>): $ResultIterable<T>;

declare function $takeSorted<T = any>(
  n: number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
): (source: $SourceIterable<T>) => $ResultIterable<T>;

declare function $takeSorted<T = any>(n: number, source: $SourceIterable<T>): $ResultIterable<T>;

declare function $takeSorted<T = any>(
  func: (a: T, b: T) => number,
  n: number,
  source: $SourceIterable<T>,
): $ResultIterable<T>;

export default $takeSorted;
