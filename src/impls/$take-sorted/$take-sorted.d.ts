import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $takeSorted<T>(iterable: $Wrappable<T>): $IterableIterator<T>;

declare function $takeSorted<T>(n: number): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(
  func: (a: T, b: T) => number,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(n: number, source: $Wrappable<T>): $IterableIterator<T>;

declare function $takeSorted<T>(
  n: number,
  func: (a: T, b: T) => number,
  source: $Wrappable<T>,
): $IterableIterator<T>;

declare function $takeSorted<T>(
  func: (a: T, b: T) => number,
  source: $Wrappable<T>,
): $IterableIterator<T>;

export { $takeSorted };
