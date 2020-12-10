import { $Wrappable, $IterableIterator } from '../../types/$iterable';

declare function $interposeSeq<V>(
  seq: $Wrappable<V>,
): <T>(source: $Wrappable<T>) => $IterableIterator<T | V>;

declare function $interposeSeq<V, T>(
  seq: $Wrappable<V>,
  source: $Wrappable<T>,
): $IterableIterator<T | V>;

export { $interposeSeq };
