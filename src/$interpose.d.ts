import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $interpose<I>(
  interposeItem: I,
): <T = any>(iterable: $InputIterable<T>) => $IterableIterator<T | I>;

declare function $interpose<I, T = any>(
  interposeItem: I,
  iterable: $InputIterable<T>,
): $IterableIterator<T | I>;

export default $interpose;
