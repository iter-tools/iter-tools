import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interposeSeq<V>(
  seq: $SourceIterable<V>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<T | V>;

declare function $interposeSeq<V, T>(
  seq: $SourceIterable<V>,
  source: $SourceIterable<T>,
): $ResultIterable<T | V>;

export default $interposeSeq;
