import { $SourceIterable, $ResultIterable } from '../../types/$iterable';

declare function $joinWith<W, T>(
  separator: W,
  source: $SourceIterable<$SourceIterable<T>>,
): $ResultIterable<T | W>;

declare function $joinWith<W>(
  separator: W,
): <T>(source: $SourceIterable<$SourceIterable<T>>) => $ResultIterable<T | W>;

export { $joinWith };
