import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $interposeSubseq<V>(
  subseq: $SourceIterable<V>,
): <T>(source: $SourceIterable<T>) => $ResultIterable<T | V>;

declare function $interposeSubseq<V, T>(
  subseq: $SourceIterable<V>,
  source: $SourceIterable<T>,
): $ResultIterable<T | V>;

export default $interposeSubseq;
