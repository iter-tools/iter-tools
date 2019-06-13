import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T = any>(iterable: $IterableLike<T>) => $IterableIterator<T | I>;

declare function $interpose<I, T = any>(
  interposeItem: I,
  iterable: $IterableLike<T>,
): $IterableIterator<T | I>;

export default $interpose;
