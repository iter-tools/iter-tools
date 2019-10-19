import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWith<W, T>(
  value: W,
  source: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWith<W>(
  value: W,
): <T>(source: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWith;
