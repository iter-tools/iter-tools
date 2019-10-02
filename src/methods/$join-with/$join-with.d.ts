import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWith<W, T = any>(
  value: W,
  source: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWith<W>(
  value: W,
): <T = any>(source: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export default $joinWith;
