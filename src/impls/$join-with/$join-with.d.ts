import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $joinWith<W, T>(
  separator: W,
  source: $Wrappable<$Wrappable<T>>,
): $IterableIterator<T | W>;

declare function $joinWith<W>(
  separator: W,
): <T>(source: $Wrappable<$Wrappable<T>>) => $IterableIterator<T | W>;

export { $joinWith };
