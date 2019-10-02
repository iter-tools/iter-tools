import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWith<W, T = any>(
  value: W,
  iterable: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWith<W>(
  value: W,
): <T = any>(iterable: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWith;
