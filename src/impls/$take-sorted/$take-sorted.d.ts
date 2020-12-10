import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $takeSorted<T>(iterable: $Wrappable<T>): $IterableIterator<T>;

declare function $takeSorted<T>(n: number): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(
  n: number,
  compare: (a: T, b: T) => number,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(
  compare: (a: T, b: T) => number,
): (source: $Wrappable<T>) => $IterableIterator<T>;

declare function $takeSorted<T>(n: number, source: $Wrappable<T>): $IterableIterator<T>;

declare function $takeSorted<T>(
  n: number,
  compare: (a: T, b: T) => number,
  source: $Wrappable<T>,
): $IterableIterator<T>;

declare function $takeSorted<T>(
  compare: (a: T, b: T) => number,
  source: $Wrappable<T>,
): $IterableIterator<T>;

export { $takeSorted };
