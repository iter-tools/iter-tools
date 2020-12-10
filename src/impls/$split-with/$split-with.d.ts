import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $splitWith<T>(
  predicate: (value: T, i: number) => any,
): (source: $Wrappable<T>) => $IterableIterator<$IterableIterator<T>>;

declare function $splitWith<T>(
  predicate: (value: T, i: number) => any,
  source: $Wrappable<T>,
): $IterableIterator<$IterableIterator<T>>;

export { $splitWith };
